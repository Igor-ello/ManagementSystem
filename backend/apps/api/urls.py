from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, TaskViewSet, CustomUserViewSet, UserProfileView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


# Создание маршрутизатора для ViewSet
router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'users', CustomUserViewSet, basename='user')

# Список URL
urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Получение токена
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Обновление токена
    path('', include(router.urls)), # Включение маршрутов из router
    path('profile/', UserProfileView.as_view(), name='user_profile'),
]
