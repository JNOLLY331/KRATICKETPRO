from rest_framework import serializers
from .models import Ticket, Category, TicketAttachment, InternalNote, Feedback
from users.serializers import UserSerializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TicketAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketAttachment
        fields = '__all__'

class InternalNoteSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.full_name', read_only=True)

    class Meta:
        model = InternalNote
        fields = ['id', 'ticket', 'author', 'author_name', 'content', 'created_at']
        read_only_fields = ['author']

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'

class TicketSerializer(serializers.ModelSerializer):
    created_by_details = UserSerializer(source='created_by', read_only=True)
    assigned_to_details = UserSerializer(source='assigned_to', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    attachments = TicketAttachmentSerializer(many=True, read_only=True)
    feedback = FeedbackSerializer(read_only=True)

    class Meta:
        model = Ticket
        fields = [
            'id', 'ticket_id', 'title', 'description', 'category', 'category_name',
            'priority', 'status', 'created_by', 'created_by_details',
            'assigned_to', 'assigned_to_details', 'created_at', 'updated_at',
            'resolved_at', 'due_date', 'attachments', 'feedback'
        ]
        read_only_fields = ['ticket_id', 'created_by', 'created_at', 'updated_at', 'resolved_at']
