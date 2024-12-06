from rest_framework import serializers
from .models import Project, Task, CustomUser
from rest_framework.exceptions import PermissionDenied


class ProjectSerializer(serializers.ModelSerializer):
    """Сериализатор для модели проекта"""
    owner = serializers.StringRelatedField()
    participants = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), many=True)

    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'owner', 'participants', 'created_at', 'status']

    def create(self, validated_data):
        """Создание нового проекта"""
        user = self.context['request'].user

        if user.role not in ['Admin', 'Manager']:
            raise PermissionDenied("You don't have permission to create a project")

        participants = validated_data.pop('participants', [])
        project = Project.objects.create(**validated_data)
        project.participants.set(participants)
        return project

    def update(self, instance, validated_data):
        """Обновление существующего проекта"""
        participants = validated_data.pop('participants', None)
        if participants is not None:
            instance.participants.set(participants)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class CustomUserSerializer(serializers.ModelSerializer):
    """Сериализатор для модели пользователя"""

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        """Создание нового пользователя"""
        user = self.context['request'].user

        if user.role != 'Admin':
            raise PermissionDenied("You don't have permission to create a user")

        return CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            role=validated_data.get('role', 'User')
        )

    def update(self, instance, validated_data):
        """Обновление существующего пользователя"""
        user = self.context['request'].user

        if user != instance and user.role != 'Admin':
            raise PermissionDenied("You don't have permission to update this user")

        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.role = validated_data.get('role', instance.role)

        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)

        instance.save()
        return instance


class TaskSerializer(serializers.ModelSerializer):
    """Сериализатор для модели задачи"""
    assignees = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), many=True, allow_null=True)
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status', 'due_date', 'start_date', 'project', 'assignees', 'creator', 'created_at']

    def create(self, validated_data):
        """Создание новой задачи"""
        user = self.context['request'].user

        if user.role not in ['Admin', 'Manager']:
            raise PermissionDenied("You don't have permission to create a task")

        validated_data['creator'] = user
        assignees = validated_data.pop('assignees', [])
        task = Task.objects.create(**validated_data)
        if assignees:
            task.assignees.set(assignees)
        return task

    def update(self, instance, validated_data):
        """Обновление существующей задачи"""
        user = self.context['request'].user

        if instance.creator != user and user.role not in ['Admin', 'Manager']:
            raise PermissionDenied("You don't have permission to update this task")

        assignees = validated_data.pop('assignees', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if assignees is not None:
            instance.assignees.set(assignees)
        return instance
