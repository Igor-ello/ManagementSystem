from django.urls import path, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, TaskViewSet, CustomUserViewSet, RegisterView

# Создание маршрутизатора для ViewSet
router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'users', CustomUserViewSet, basename='user')

# Список URL
urlpatterns = [
    # Маршрут для регистрации пользователя
    path('users/register/', RegisterView.as_view(), name='register'),

    # Все маршруты, созданные через router
    path('', include(router.urls)),
]
