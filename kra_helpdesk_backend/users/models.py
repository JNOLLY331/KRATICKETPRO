from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, staff_number, password=None, **extra_fields):
        if not staff_number:
            raise ValueError('The Staff Number field must be set')
        user = self.model(staff_number=staff_number, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, staff_number, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'ADMIN')

        return self.create_user(staff_number, password, **extra_fields)

class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name

class User(AbstractUser):
    ROLE_CHOICES = (
        ('END_USER', 'End User'),
        ('ICT_STAFF', 'ICT Support Staff'),
        ('ADMIN', 'Main Admin'),
    )

    username = None
    email = models.EmailField(unique=True, null=True, blank=True)
    full_name = models.CharField(max_length=255)
    staff_number = models.CharField(max_length=50, unique=True)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, related_name='users')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='END_USER')

    objects = UserManager()

    USERNAME_FIELD = 'staff_number'
    REQUIRED_FIELDS = ['full_name', 'email']

    def __str__(self):
        return f"{self.full_name} ({self.role})"
