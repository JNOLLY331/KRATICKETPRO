import os
import django
from django.utils import timezone
from datetime import timedelta

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from tickets.models import Ticket, Category
from users.models import Department
from django.contrib.auth import get_user_model

User = get_user_model()

def populate_tickets():
    print("Populating test tickets...")
    admin = User.objects.get(email='admin@kra.go.ke')
    tech = User.objects.get(email='tech@kra.go.ke')
    
    cat_net = Category.objects.get(name='Network Problems')
    cat_hw = Category.objects.get(name='Hardware Issues')
    cat_sw = Category.objects.get(name='Software Installation')
    
    tickets_data = [
        {
            'title': 'VPN connection failing for remote work',
            'description': 'Cannot connect to KRA VPN from home. Error: "Server not responding". Tried restarting the router but still fails.',
            'category': cat_net,
            'priority': 'HIGH',
            'status': 'IN_PROGRESS',
            'assigned_to': tech,
        },
        {
            'title': 'Printer in Room 302 is offline',
            'description': 'The HP LaserJet in the HR department is showing as offline. We cannot print payroll documents.',
            'category': cat_hw,
            'priority': 'CRITICAL',
            'status': 'PENDING',
        },
        {
            'title': 'Request for Adobe Acrobat Pro',
            'description': 'I need Adobe Acrobat Pro to edit PDF documents for the legal team. Approval from HOD Legal is attached.',
            'category': cat_sw,
            'priority': 'LOW',
            'status': 'RESOLVED',
            'assigned_to': tech,
        }
    ]
    
    for t_data in tickets_data:
        Ticket.objects.create(created_by=admin, **t_data)
        
    print(f"Created {len(tickets_data)} test tickets.")

if __name__ == '__main__':
    populate_tickets()
