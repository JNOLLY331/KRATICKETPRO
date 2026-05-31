from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from django.db.models import Q
from .models import Ticket, Category, TicketAttachment, InternalNote, Feedback
from .serializers import (
    TicketSerializer, CategorySerializer, TicketAttachmentSerializer,
    InternalNoteSerializer, FeedbackSerializer
)
from users.models import User
from users.serializers import UserSerializer
from analytics.models import ActivityLog


class TicketViewSet(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'priority', 'category', 'assigned_to']
    search_fields = ['ticket_id', 'title', 'description']
    ordering_fields = ['created_at', 'updated_at', 'priority']
    ordering = ['-created_at']

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            return Ticket.objects.select_related(
                'created_by', 'assigned_to', 'category'
            ).prefetch_related('attachments', 'internal_notes').all()
        elif user.role == 'ICT_STAFF':
            return Ticket.objects.select_related(
                'created_by', 'assigned_to', 'category'
            ).prefetch_related('attachments', 'internal_notes').filter(
                Q(assigned_to=user) | Q(status='PENDING')
            )
        else:
            return Ticket.objects.select_related(
                'created_by', 'assigned_to', 'category'
            ).prefetch_related('attachments', 'internal_notes').filter(
                created_by=user
            )

    def perform_create(self, serializer):
        instance = serializer.save(created_by=self.request.user)
        ActivityLog.objects.create(
            user=self.request.user,
            action=f"Created ticket {instance.ticket_id}: {instance.title}",
            ticket=instance,
            ip_address=self.request.META.get('REMOTE_ADDR')
        )

    def perform_update(self, serializer):
        old_status = serializer.instance.status
        instance = serializer.save()
        if instance.status == 'RESOLVED' and not instance.resolved_at:
            instance.resolved_at = timezone.now()
            instance.save()
        if old_status != instance.status:
            ActivityLog.objects.create(
                user=self.request.user,
                action=f"Updated ticket {instance.ticket_id} status to {instance.status}",
                ticket=instance,
                ip_address=self.request.META.get('REMOTE_ADDR')
            )

    @action(detail=True, methods=['post'], url_path='assign')
    def assign_ticket(self, request, pk=None):
        ticket = self.get_object()
        staff_id = request.data.get('staff_id')
        if not staff_id:
            return Response({'error': 'staff_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            staff = User.objects.get(id=staff_id, role='ICT_STAFF')
        except User.DoesNotExist:
            return Response({'error': 'ICT Staff not found'}, status=status.HTTP_404_NOT_FOUND)
        ticket.assigned_to = staff
        ticket.status = 'IN_PROGRESS'
        ticket.save()
        ActivityLog.objects.create(
            user=request.user,
            action=f"Assigned ticket {ticket.ticket_id} to {staff.full_name}",
            ticket=ticket,
            ip_address=request.META.get('REMOTE_ADDR')
        )
        return Response(TicketSerializer(ticket).data)

    @action(detail=True, methods=['post'], url_path='feedback')
    def submit_feedback(self, request, pk=None):
        ticket = self.get_object()
        if ticket.status != 'RESOLVED':
            return Response({'error': 'Feedback can only be given on resolved tickets.'}, status=status.HTTP_400_BAD_REQUEST)
        if hasattr(ticket, 'feedback'):
            return Response({'error': 'Feedback already submitted.'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = FeedbackSerializer(data={**request.data, 'ticket': ticket.id})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], url_path='ict-staff-list')
    def ict_staff_list(self, request):
        staff = User.objects.filter(role='ICT_STAFF')
        return Response(UserSerializer(staff, many=True).data)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


class InternalNoteViewSet(viewsets.ModelViewSet):
    serializer_class = InternalNoteSerializer

    def get_queryset(self):
        return InternalNote.objects.filter(
            ticket_id=self.kwargs['ticket_pk']
        ).select_related('author')

    def perform_create(self, serializer):
        serializer.save(
            author=self.request.user,
            ticket_id=self.kwargs['ticket_pk']
        )


class FeedbackViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = FeedbackSerializer

    def get_queryset(self):
        return Feedback.objects.all()
