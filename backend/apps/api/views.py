from django.core.cache import cache
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
import logging
from .models import Project, Task, CustomUser
from .serializers import ProjectSerializer, TaskSerializer, CustomUserSerializer

logger = logging.getLogger(__name__)

class ProjectViewSet(ModelViewSet):
    """CRUD операции для проектов"""
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_cache_key(self, user):
        """Создание уникального ключа для кэширования данных текущего пользователя"""
        return f"projects_{user.id}"

    def list(self, request, *args, **kwargs):
        """Получение списка проектов с кэшированием"""
        user = request.user
        cache_key = self.get_cache_key(user)

        # Проверяем, есть ли данные в кэше
        cached_projects = cache.get(cache_key)
        if cached_projects:
            logger.info(f"Projects fetched from cache for user {user.id}")
            return Response(cached_projects)

        # Если данных нет в кэше, запрашиваем их из базы
        projects = self.get_queryset()
        serializer = self.get_serializer(projects, many=True)

        # Кэшируем данные
        cache.set(cache_key, serializer.data, timeout=60*5)  # Кэшируем на 5 минут
        logger.info(f"Projects cached for user {user.id}")

        return Response(serializer.data)

    def perform_create(self, serializer):
        """Создание проекта с проверкой прав владельца"""
        user = self.request.user
        if user.role not in ['Admin', 'Manager']:
            raise PermissionDenied("You don't have permission to create a project.")
        serializer.save(owner=user)

        # Сброс кэша для проекта
        cache.delete(self.get_cache_key(user))
        logger.info(f"Cache cleared for projects of user {user.id} after project creation.")

    def perform_update(self, serializer):
        """Обновление проекта с проверкой прав доступа"""
        user = self.request.user
        project = self.get_object()
        if project.owner != user and user.role != 'Admin':
            raise PermissionDenied("You don't have permission to update this project.")
        serializer.save()

        # Сброс кэша для проекта
        cache.delete(self.get_cache_key(user))
        logger.info(f"Cache cleared for projects of user {user.id} after project update.")

    def update(self, request, *args, **kwargs):
        """Частичное или полное обновление проекта"""
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        user = request.user
        if instance.owner != user and user.role != 'Admin':
            raise PermissionDenied("You don't have permission to update this project.")
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        """Удаление проекта с проверкой прав доступа"""
        instance = self.get_object()
        user = request.user
        if instance.owner != user and user.role != 'Admin':
            raise PermissionDenied("You don't have permission to delete this project.")
        self.perform_destroy(instance)

        # Сброс кэша для проекта
        cache.delete(self.get_cache_key(user))
        logger.info(f"Cache cleared for projects of user {user.id} after project deletion.")

        return Response({"detail": "Project deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        """Физическое удаление проекта"""
        instance.delete()


class CustomUserViewSet(ModelViewSet):
    """CRUD операции для пользователей"""
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

    def get_cache_key(self, user):
        """Создание уникального ключа для кэширования данных текущего пользователя"""
        return f"user_{user.id}"

    def list(self, request, *args, **kwargs):
        """Получение списка пользователей с кэшированием"""
        user = request.user
        cache_key = self.get_cache_key(user)

        # Проверяем, есть ли данные в кэше
        cached_users = cache.get(cache_key)
        if cached_users:
            logger.info(f"Users fetched from cache for user {user.id}")
            return Response(cached_users)

        # Если данных нет в кэше, запрашиваем их из базы
        users = self.get_queryset()
        serializer = self.get_serializer(users, many=True)

        # Кэшируем данные
        cache.set(cache_key, serializer.data, timeout=60 * 5)  # Кэшируем на 5 минут
        logger.info(f"Users cached for user {user.id}")

        return Response(serializer.data)

    def perform_create(self, serializer):
        """Создание пользователя доступно только для Admin"""
        user = self.request.user
        if user.role != 'Admin':
            raise PermissionDenied("You don't have permission to create a user.")
        serializer.save()

        # Сброс кэша для проекта
        cache.delete(self.get_cache_key(user))
        logger.info(f"Cache cleared for users of user {user.id} after user creation.")

    def perform_update(self, serializer):
        """Обновление пользователя с проверкой прав"""
        user = self.request.user
        current_user = self.get_object()
        if user != current_user and user.role != 'Admin':
            raise PermissionDenied("You don't have permission to update this user.")
        serializer.save()

        # Сброс кэша для проекта
        cache.delete(self.get_cache_key(user))
        logger.info(f"Cache cleared for users of user {user.id} after user update.")

    def perform_destroy(self, instance):
        """Удаление пользователя с проверкой прав доступа"""
        user = self.request.user
        if user != instance and user.role != 'Admin':
            raise PermissionDenied("You don't have permission to delete this user.")
        instance.delete()

        # Сброс кэша для пользователя
        cache.delete(self.get_cache_key(user))
        logger.info(f"Cache cleared for user {user.id} after user deletion.")


class TaskViewSet(ModelViewSet):
    """CRUD операции для задач"""
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_cache_key(self, user):
        """Создание уникального ключа для кэширования задач пользователя"""
        return f"tasks_{user.id}"

    def list(self, request, *args, **kwargs):
        """Получение списка задач с кэшированием"""
        user = request.user
        cache_key = self.get_cache_key(user)

        # Проверяем, есть ли данные в кэше
        cached_tasks = cache.get(cache_key)
        if cached_tasks:
            logger.info(f"Tasks fetched from cache for user {user.id}")
            return Response(cached_tasks)

        # Если данных нет в кэше, запрашиваем их из базы
        tasks = self.get_queryset()
        serializer = self.get_serializer(tasks, many=True)

        # Кэшируем данные
        cache.set(cache_key, serializer.data, timeout=60*5)  # Кэшируем на 5 минут
        logger.info(f"Tasks cached for user {user.id}")

        return Response(serializer.data)

    def perform_create(self, serializer):
        """Создание задачи с проверкой прав"""
        user = self.request.user
        if user.role not in ['Admin', 'Manager']:
            raise PermissionDenied("You don't have permission to create a task.")
        serializer.save(creator=user)

        # Сброс кэша для проекта
        cache.delete(self.get_cache_key(user))
        logger.info(f"Cache cleared for tasks of user {user.id} after task creation.")

    def perform_update(self, serializer):
        """Обновление задачи с проверкой прав"""
        user = self.request.user
        task = self.get_object()
        if task.creator != user and user.role not in ['Admin', 'Manager']:
            raise PermissionDenied("You don't have permission to update this task.")
        serializer.save()

        # Сброс кэша для проекта
        cache.delete(self.get_cache_key(user))
        logger.info(f"Cache cleared for tasks of user {user.id} after task update.")

    def perform_destroy(self, instance):
        """Удаление задачи с проверкой прав"""
        user = self.request.user
        if instance.creator != user and user.role not in ['Admin', 'Manager']:
            raise PermissionDenied("You don't have permission to delete this task.")
        instance.delete()

        # Сброс кэша для задач
        cache.delete(self.get_cache_key(user))
        logger.info(f"Cache cleared for tasks of user {user.id} after task deletion.")
