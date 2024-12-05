from rest_framework.viewsets import ModelViewSet
from .models import Project, Task
from .serializers import ProjectSerializer, TaskSerializer

class ProjectViewSet(ModelViewSet):
    """CRUD для проектов"""
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class TaskViewSet(ModelViewSet):
    """CRUD для задач"""
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
