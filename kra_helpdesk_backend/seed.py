import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from users.models import Department
from tickets.models import Category
from django.contrib.auth import get_user_model

User = get_user_model()

def seed_db():
    print("Seeding database...")
    
    # Departments
    departments = [
        {'name': 'ICT Department', 'code': 'ICT'},
        {'name': 'Customs & Border Control', 'code': 'CBC'},
        {'name': 'Domestic Taxes Department', 'code': 'DTD'},
        {'name': 'Human Resources', 'code': 'HR'},
        {'name': 'Finance & Logistics', 'code': 'FIN'},
        {'name': 'Legal & Board Coordination', 'code': 'LBC'},
        {'name': 'Intelligence & Strategic Operations', 'code': 'ISO'},
    ]
    
    for dept in departments:
        Department.objects.get_or_create(code=dept['code'], defaults={'name': dept['name']})
    print(f"Created/Checked {len(departments)} departments.")
    
    # Categories
    categories = [
        {'name': 'Network Problems', 'description': 'Issues with WiFi, Ethernet, or VPN connectivity'},
        {'name': 'Hardware Issues', 'description': 'Problems with PCs, laptops, monitors, or printers'},
        {'name': 'Software Installation', 'description': 'Requests for installing new software or updates'},
        {'name': 'Email Issues', 'description': 'Outlook configuration, sending/receiving problems'},
        {'name': 'Password Reset', 'description': 'Requests to reset system or application passwords'},
        {'name': 'CCTV & Security', 'description': 'Issues with surveillance systems or access cards'},
        {'name': 'SAP / ERP Systems', 'description': 'Errors or access issues in core business systems'},
    ]
    
    for cat in categories:
        Category.objects.get_or_create(name=cat['name'], defaults={'description': cat['description']})
    print(f"Created/Checked {len(categories)} categories.")

    # Create a default admin if not exists
    if not User.objects.filter(email='admin@kra.go.ke').exists():
        User.objects.create_superuser(
            email='admin@kra.go.ke',
            password='adminpassword',
            full_name='System Admin',
            staff_number='KRA-ADMIN-001'
        )
        print("Created default admin: admin@kra.go.ke / adminpassword")

    # Create a default technician if not exists
    if not User.objects.filter(email='tech@kra.go.ke').exists():
        dept = Department.objects.get(code='ICT')
        User.objects.create_user(
            email='tech@kra.go.ke',
            password='techpassword',
            full_name='ICT Technician',
            staff_number='KRA-TECH-001',
            department=dept,
            role='ICT_STAFF'
        )
        print("Created default technician: tech@kra.go.ke / techpassword")

    print("Seeding complete!")

if __name__ == '__main__':
    seed_db()
