from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.conf import settings


class Project(models.Model):
    """Модель проекта"""
    id = models.BigAutoField(primary_key=True)
    User = settings.AUTH_USER_MODEL
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    owner = models.ForeignKey(User, related_name="owned_projects", on_delete=models.CASCADE, null=True, blank=True)
    participants = models.ManyToManyField(User, related_name="participating_projects", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=[('Active', 'Active'), ('Archived', 'Archived')], default='Active')

    def __str__(self):
        return self.name


class CustomUser(AbstractUser):
    """Модель пользователя"""
    ROLE_CHOICES = [
        ('Admin', 'Admin'),
        ('Manager', 'Manager'),
        ('Employee', 'Employee'),
    ]

    id = models.BigAutoField(primary_key=True)
    role = models.CharField(
        max_length=50,
        choices=ROLE_CHOICES,
        default='Employee',
    )
    groups = models.ManyToManyField(
        Group,
        related_name="customuser_groups",
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="customuser_permissions",
        blank=True,
    )

    def __str__(self):
        return f"{self.username} ({self.role})"


class Task(models.Model):
    """Модель задачи"""
    STATUS_CHOICES = [
        ('To Do', 'To Do'),
        ('In Progress', 'In Progress'),
        ('Done', 'Done'),
        ('Blocked', 'Blocked'),
        ('In Review', 'In Review'),
    ]
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='To Do')
    due_date = models.DateTimeField(null=True, blank=True)
    start_date = models.DateTimeField(null=True, blank=True)
    project = models.ForeignKey('Project', related_name='tasks', on_delete=models.CASCADE)
    assignees = models.ManyToManyField(CustomUser, related_name='tasks', blank=True)
    creator = models.ForeignKey(CustomUser, related_name='created_tasks', on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
