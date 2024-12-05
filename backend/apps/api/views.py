from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Project, Task, CustomUser
from .serializers import ProjectSerializer, TaskSerializer, CustomUserSerializer


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_authenticated:
            # Назначить текущего пользователя владельцем проекта
            serializer.save(owner=user)
        else:
            raise PermissionDenied("You must be logged in to create a project.")


class TaskViewSet(ModelViewSet):
    """CRUD для задач"""
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class CustomUserViewSet(ModelViewSet):
    """CRUD для пользователей"""
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def perform_update(self, serializer):
        # Можно добавить дополнительные проверки или логику перед обновлением пользователя
        serializer.save()


class RegisterView(APIView):
    permission_classes = [AllowAny]  # Разрешить доступ без авторизации

    def post(self, request, *args, **kwargs):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)