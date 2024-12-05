from rest_framework import serializers
from .models import Project, Task, CustomUser


class ProjectSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField()  # Отображение владельца как строку
    participants = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), many=True)  # Участники

    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'owner', 'participants', 'created_at', 'status']


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'role']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)  # создание пользователя с хешированием пароля
        return user


class TaskSerializer(serializers.ModelSerializer):
    assignee = CustomUserSerializer()

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status', 'due_date', 'start_date', 'project', 'assignee', 'created_at']