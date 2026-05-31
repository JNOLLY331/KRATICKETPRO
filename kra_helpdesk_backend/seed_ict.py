import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from users.models import User, Department

def seed_ict_staff():
    # Ensure ICT department exists
    ict_dept, _ = Department.objects.get_or_create(code='ICT', defaults={'name': 'ICT Department'})
    
    ict_members = [
        {"name": "Japheth Anold", "staff_number": "30011111"},
        {"name": "James Patrick", "staff_number": "30011112"},
        {"name": "Abel Emuduki", "staff_number": "30011113"},
        {"name": "Eddy Ngeno", "staff_number": "30011114"},
        {"name": "Mark Sewiy", "staff_number": "30011115"},
    ]
    
    for member in ict_members:
        user, created = User.objects.get_or_create(
            staff_number=member['staff_number'],
            defaults={
                'full_name': member['name'],
                'department': ict_dept,
                'role': 'ICT_STAFF',
                'email': f"{member['staff_number']}@kra.go.ke"
            }
        )
        if created:
            user.set_password('KRA@2026') # Default password for initial staff
            user.save()
            print(f"Created ICT Staff: {member['name']} ({member['staff_number']})")
        else:
            # Update role to ICT_STAFF if already exists
            user.role = 'ICT_STAFF'
            user.save()
            print(f"Updated ICT Staff: {member['name']} ({member['staff_number']})")

if __name__ == "__main__":
    seed_ict_staff()
