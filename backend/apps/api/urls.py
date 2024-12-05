from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, TaskViewSet, CustomUserViewSet, RegisterView

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'users', CustomUserViewSet, basename='user')

urlpatterns = [
path('users/register/', RegisterView.as_view(), name='register'),  # новый маршрут для регистрации
    path('', include(router.urls)),
]
