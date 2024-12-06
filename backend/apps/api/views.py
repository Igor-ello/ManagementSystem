from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from .models import Project, Task, CustomUser
from .serializers import ProjectSerializer, TaskSerializer, CustomUserSerializer


class ProjectViewSet(ModelViewSet):
    """CRUD для проектов"""
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]  # Все запросы требуют авторизации

    def perform_create(self, serializer):
        """Назначаем владельца проекта через ID создателя с проверкой прав"""
        user = self.request.user

        # Проверка, что пользователь имеет право создавать проекты (только Admin или Manager)
        if user.role not in ['Admin', 'Manager']:
            raise PermissionDenied("You don't have permission to create a project.")

        # Устанавливаем владельца как текущего пользователя
        serializer.save(owner=user)

    def perform_update(self, serializer):
        """Обновление проекта с проверкой прав владельца"""
        user = self.request.user
        project = self.get_object()

        if project.owner != user and user.role != 'Admin':
            raise PermissionDenied("You don't have permission to update this project.")

        serializer.save()


class CustomUserViewSet(ModelViewSet):
    """CRUD для пользователей"""
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]  # Только авторизованные пользователи могут выполнять действия

    def perform_create(self, serializer):
        """Пользователь может создавать других пользователей только если он Admin"""
        user = self.request.user  # Получаем текущего аутентифицированного пользователя
        if user.role != 'Admin':
            raise PermissionDenied("You don't have permission to create a user.")

        # Создаём нового пользователя
        serializer.save()

    def perform_update(self, serializer):
        """Обновление пользователя с проверкой прав"""
        user = self.request.user  # Получаем текущего аутентифицированного пользователя
        current_user = self.get_object()  # Получаем пользователя, чьи данные обновляются

        # Проверяем, что только Admin или сам пользователь может обновить свои данные
        if user != current_user and user.role != 'Admin':
            raise PermissionDenied("You don't have permission to update this user.")

        # Сохраняем изменения
        serializer.save()


class TaskViewSet(ModelViewSet):
    """CRUD для задач"""
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """Создание задачи с проверкой прав"""
        user = self.request.user

        # Проверка, что пользователь имеет право создавать задачи (только Admin, Manager или участник проекта)
        if user.role not in ['Admin', 'Manager']:
            raise PermissionDenied("You don't have permission to create a task.")

        # Устанавливаем создателя задачи как текущего пользователя
        serializer.save(creator=user)

    def perform_update(self, serializer):
        """Обновление задачи с проверкой прав"""
        user = self.request.user
        task = self.get_object()

        if task.creator != user and user.role not in ['Admin', 'Manager']:
            raise PermissionDenied("You don't have permission to update this task.")

        serializer.save()
