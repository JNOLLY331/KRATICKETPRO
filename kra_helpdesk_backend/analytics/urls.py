from django.urls import path
from .views import DashboardStatsView, RecentActivityView, StaffPerformanceView

urlpatterns = [
    path('stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('activity/', RecentActivityView.as_view(), name='recent-activity'),
    path('staff-performance/', StaffPerformanceView.as_view(), name='staff-performance'),
]
