from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from .models import Project, Task, CustomUser
from .serializers import ProjectSerializer, TaskSerializer, CustomUserSerializer


class ProjectViewSet(ModelViewSet):
    """CRUD операции для проектов"""
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """Создание проекта с проверкой прав владельца"""
        user = self.request.user
        if user.role not in ['Admin', 'Manager']:
            raise PermissionDenied("You don't have permission to create a project.")
        serializer.save(owner=user)

    def perform_update(self, serializer):
        """Обновление проекта с проверкой прав доступа"""
        user = self.request.user
        project = self.get_object()
        if project.owner != user and user.role != 'Admin':
            raise PermissionDenied("You don't have permission to update this project.")
        serializer.save()

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
        return Response({"detail": "Project deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        """Физическое удаление проекта"""
        instance.delete()


class CustomUserViewSet(ModelViewSet):
    """CRUD операции для пользователей"""
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """Создание пользователя доступно только для Admin"""
        user = self.request.user
        if user.role != 'Admin':
            raise PermissionDenied("You don't have permission to create a user.")
        serializer.save()

    def perform_update(self, serializer):
        """Обновление пользователя с проверкой прав"""
        user = self.request.user
        current_user = self.get_object()
        if user != current_user and user.role != 'Admin':
            raise PermissionDenied("You don't have permission to update this user.")
        serializer.save()


class TaskViewSet(ModelViewSet):
    """CRUD операции для задач"""
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """Создание задачи с проверкой прав"""
        user = self.request.user
        if user.role not in ['Admin', 'Manager']:
            raise PermissionDenied("You don't have permission to create a task.")
        serializer.save(creator=user)

    def perform_update(self, serializer):
        """Обновление задачи с проверкой прав"""
        user = self.request.user
        task = self.get_object()
        if task.creator != user and user.role not in ['Admin', 'Manager']:
            raise PermissionDenied("You don't have permission to update this task.")
        serializer.save()
