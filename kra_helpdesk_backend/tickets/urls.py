from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TicketViewSet, CategoryViewSet, InternalNoteViewSet

router = DefaultRouter()
router.register(r'', TicketViewSet, basename='ticket')
router.register(r'categories', CategoryViewSet, basename='category')

urlpatterns = [
    path('categories/', CategoryViewSet.as_view({'get': 'list'}), name='category-list'),
    path('', include(router.urls)),
    path('<int:ticket_pk>/notes/', InternalNoteViewSet.as_view({'get': 'list', 'post': 'create'}), name='ticket-notes'),
]
