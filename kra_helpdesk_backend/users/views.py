from rest_framework import status, permissions, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializers import UserSerializer, UserCreateSerializer, DepartmentSerializer
from .models import User, Department


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # If the frontend sends 'staff_number', map it to the expected 'username' field for JWT
        # SimpleJWT expects the key to match USERNAME_FIELD, which we set to 'staff_number'
        staff_number = attrs.get('staff_number') or attrs.get(self.username_field)
        if staff_number:
            attrs[self.username_field] = staff_number
            
        data = super().validate(attrs)
        
        # Add extra user info to response
        data['id'] = self.user.id
        data['full_name'] = self.user.full_name
        data['staff_number'] = self.user.staff_number
        data['role'] = self.user.role
        data['department_name'] = self.user.department.name if self.user.department else None
        
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def patch(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DepartmentListView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        departments = Department.objects.all()
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data)


class UserListView(generics.ListAPIView):
    """Admin: list all users"""
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role not in ['ADMIN', 'ICT_STAFF']:
            return User.objects.none()
        role_filter = self.request.query_params.get('role')
        qs = User.objects.select_related('department').all()
        if role_filter:
            qs = qs.filter(role=role_filter)
        return qs


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Admin: manage a specific user"""
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role != 'ADMIN':
            return User.objects.none()
        return User.objects.all()
