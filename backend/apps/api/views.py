from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from .models import Project, Task, CustomUser
from .serializers import ProjectSerializer, TaskSerializer, CustomUserSerializer


class ProjectViewSet(ModelViewSet):
    """CRUD для проектов"""
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def perform_create(self, serializer):
        """Назначаем владельца проекта через ID создателя с проверкой прав"""
        creator_id = self.request.data.get('owner')  # Получаем ID создателя
        user = self.request.user

        # Проверка, что пользователь имеет право создавать проекты (только Admin или Manager)
        if user.role not in ['Admin', 'Manager']:
            raise PermissionDenied("You don't have permission to create a project.")

        if creator_id:
            serializer.save(owner_id=creator_id)  # Устанавливаем владельца через переданный ID
        else:
            serializer.save()

    def perform_update(self, serializer):
        """Обновление проекта с проверкой прав владельца"""
        user = self.request.user
        project = self.get_object()

        if project.owner != user and user.role != 'Admin':
            raise PermissionDenied("You don't have permission to update this project.")

        serializer.save()


class TaskViewSet(ModelViewSet):
    """CRUD для задач"""
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def perform_create(self, serializer):
        """Создание задачи с проверкой прав"""
        creator_id = self.request.data.get('creator')  # Получаем ID создателя задачи
        user = self.request.user

        # Проверка, что пользователь имеет право создавать задачи (только Admin, Manager или участник проекта)
        if user.role not in ['Admin', 'Manager']:
            raise PermissionDenied("You don't have permission to create a task.")

        if creator_id:
            serializer.save(creator_id=creator_id)  # Устанавливаем создателя задачи
        else:
            serializer.save()

    def perform_update(self, serializer):
        """Обновление задачи с проверкой прав"""
        user = self.request.user
        task = self.get_object()

        if task.creator != user and user.role not in ['Admin', 'Manager']:
            raise PermissionDenied("You don't have permission to update this task.")

        serializer.save()


class CustomUserViewSet(ModelViewSet):
    """CRUD для пользователей"""
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def perform_create(self, serializer):
        """Пользователь может создавать других пользователей только если он Admin"""
        admin_id = self.request.data.get('admin_id')  # Получаем ID администратора из запроса
        if not admin_id:
            raise PermissionDenied("Admin ID is required.")  # Если ID администратора нет, возвращаем ошибку

        try:
            admin_user = CustomUser.objects.get(id=admin_id)
        except CustomUser.DoesNotExist:
            raise PermissionDenied("Admin user does not exist.")  # Если такого пользователя нет

        # Проверяем роль администратора
        if admin_user.role != 'Admin':
            raise PermissionDenied("You don't have permission to create a user.")

        # Сохраняем пользователя
        serializer.save()

    def perform_update(self, serializer):
        """Обновление пользователя с проверкой прав"""
        admin_id = self.request.data.get('admin_id')  # Получаем ID администратора из запроса
        user_id = self.request.data.get('user_id')  # Получаем ID пользователя, чьи данные обновляются

        if not admin_id or not user_id:
            raise PermissionDenied("Admin ID and User ID are required.")  # Если нет ID, возвращаем ошибку

        try:
            admin_user = CustomUser.objects.get(id=admin_id)
        except CustomUser.DoesNotExist:
            raise PermissionDenied("Admin user does not exist.")  # Если такого пользователя нет

        try:
            user_to_update = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            raise PermissionDenied("User to update does not exist.")  # Если такого пользователя нет

        # Проверяем роль администратора
        if admin_user.role != 'Admin':
            raise PermissionDenied("You don't have permission to update this user.")

        # Проверяем, что администратор может обновлять только другие аккаунты (если необходимо)
        if admin_user == user_to_update:
            raise PermissionDenied("An admin cannot update their own user details this way.")

        # Сохраняем обновленные данные
        serializer.save()


class RegisterView(APIView):
    """Регистрация пользователя без авторизации"""
    permission_classes = [AllowAny]  # Разрешить доступ без авторизации

    def post(self, request, *args, **kwargs):
        """Регистрация нового пользователя"""
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
