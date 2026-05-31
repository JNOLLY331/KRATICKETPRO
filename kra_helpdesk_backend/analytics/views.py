from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, Avg, Q, F, ExpressionWrapper, DurationField
from django.utils import timezone
from datetime import timedelta
from tickets.models import Ticket
from users.models import User, Department
from analytics.models import ActivityLog


class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role == 'ADMIN':
            qs = Ticket.objects.all()
        elif user.role == 'ICT_STAFF':
            qs = Ticket.objects.filter(
                Q(assigned_to=user) | Q(status='PENDING')
            )
        else:
            qs = Ticket.objects.filter(created_by=user)

        total = qs.count()
        resolved = qs.filter(status='RESOLVED').count()
        pending = qs.filter(status='PENDING').count()
        in_progress = qs.filter(status='IN_PROGRESS').count()
        critical = qs.filter(priority='CRITICAL').count()

        # Average resolution time (in hours)
        resolved_qs = qs.filter(status='RESOLVED', resolved_at__isnull=False)
        avg_resolution = None
        if resolved_qs.exists():
            durations = [
                (t.resolved_at - t.created_at).total_seconds() / 3600
                for t in resolved_qs
            ]
            avg_resolution = round(sum(durations) / len(durations), 1)

        # Tickets by priority
        by_priority = list(
            qs.values('priority').annotate(count=Count('id'))
        )

        # Tickets by category
        by_category = list(
            qs.values('category__name').annotate(count=Count('id')).order_by('-count')[:6]
        )

        # Monthly trend (last 6 months)
        monthly = []
        for i in range(5, -1, -1):
            d = timezone.now() - timedelta(days=30 * i)
            count = qs.filter(
                created_at__year=d.year,
                created_at__month=d.month
            ).count()
            monthly.append({
                'month': d.strftime('%b'),
                'count': count
            })

        # Top ICT Staff performance
        top_staff = list(
            Ticket.objects.filter(status='RESOLVED', assigned_to__isnull=False)
            .values('assigned_to__full_name')
            .annotate(resolved=Count('id'))
            .order_by('-resolved')[:5]
        )

        # SLA breached tickets
        now = timezone.now()
        sla_breached = qs.filter(
            due_date__lt=now,
            status__in=['PENDING', 'IN_PROGRESS']
        ).count()

        return Response({
            'total': total,
            'resolved': resolved,
            'pending': pending,
            'in_progress': in_progress,
            'critical': critical,
            'avg_resolution_hours': avg_resolution,
            'by_priority': by_priority,
            'by_category': by_category,
            'monthly_trend': monthly,
            'top_staff': top_staff,
            'sla_breached': sla_breached,
        })


class RecentActivityView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        logs = ActivityLog.objects.select_related('user', 'ticket').order_by('-timestamp')[:20]
        data = [{
            'id': log.id,
            'user': log.user.full_name if log.user else 'System',
            'action': log.action,
            'ticket_id': log.ticket.ticket_id if log.ticket else None,
            'timestamp': log.timestamp,
        } for log in logs]
        return Response(data)


class StaffPerformanceView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        staff = User.objects.filter(role='ICT_STAFF')
        result = []
        for member in staff:
            assigned = Ticket.objects.filter(assigned_to=member)
            resolved = assigned.filter(status='RESOLVED')
            avg_res = None
            resolved_with_time = resolved.filter(resolved_at__isnull=False)
            if resolved_with_time.exists():
                durations = [
                    (t.resolved_at - t.created_at).total_seconds() / 3600
                    for t in resolved_with_time
                ]
                avg_res = round(sum(durations) / len(durations), 1)

            result.append({
                'id': member.id,
                'name': member.full_name,
                'email': member.email,
                'total_assigned': assigned.count(),
                'resolved': resolved.count(),
                'pending': assigned.filter(status__in=['PENDING', 'IN_PROGRESS']).count(),
                'avg_resolution_hours': avg_res,
            })
        return Response(result)
