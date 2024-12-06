from rest_framework import serializers
from .models import Project, Task, CustomUser
from rest_framework.exceptions import PermissionDenied


class ProjectSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField()  # Отображение владельца как строки
    participants = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), many=True)  # Участники

    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'owner', 'participants', 'created_at', 'status']

    def create(self, validated_data):
        user = self.context['request'].user  # Получаем текущего аутентифицированного пользователя

        # Проверяем, что пользователь имеет право создавать проекты (только Admin или Manager)
        if user.role not in ['Admin', 'Manager']:
            raise PermissionDenied("You don't have permission to create a project.")

        # Убираем участников из данных перед созданием объекта
        participants = validated_data.pop('participants', [])

        # Создаем проект
        project = Project.objects.create(**validated_data)

        # Устанавливаем участников
        project.participants.set(participants)

        return project

    def update(self, instance, validated_data):
        user = self.context['request'].user  # Получаем текущего аутентифицированного пользователя

        # Проверяем, что только Admin или сам владелец может обновить проект
        if instance.owner != user and user.role != 'Admin':
            raise PermissionDenied("You don't have permission to update this project.")

        # Обновляем проект
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'role']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = self.context['request'].user  # Получаем текущего аутентифицированного пользователя

        # Проверяем, что только Admin может создавать пользователей
        if user.role != 'Admin':
            raise PermissionDenied("You don't have permission to create a user.")

        # Создаём нового пользователя
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            role=validated_data.get('role', 'User')  # Устанавливаем роль по умолчанию, если не указано
        )
        return user

    def update(self, instance, validated_data):
        user = self.context['request'].user  # Получаем текущего аутентифицированного пользователя

        # Проверяем, что только Admin или сам пользователь может обновить свои данные
        if user != instance and user.role != 'Admin':
            raise PermissionDenied("You don't have permission to update this user.")

        # Обновляем поля, если они есть в запросе
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.role = validated_data.get('role', instance.role)

        # Если пароль передан, хешируем его
        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)

        # Сохраняем обновленные данные
        instance.save()
        return instance


class TaskSerializer(serializers.ModelSerializer):
    assignee = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), allow_null=True)  # ID исполнителя
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())  # Привязка к проекту
    creator = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())  # ID создателя задачи

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status', 'due_date', 'start_date', 'project', 'assignee', 'creator', 'created_at']

    def create(self, validated_data):
        user = self.context['request'].user  # Получаем текущего аутентифицированного пользователя

        # Проверка, что только Admin или Manager может создавать задачи
        if user.role not in ['Admin', 'Manager']:
            raise PermissionDenied("You don't have permission to create a task.")

        validated_data['creator'] = user  # Устанавливаем текущего пользователя как создателя задачи
        return Task.objects.create(**validated_data)

    def update(self, instance, validated_data):
        user = self.context['request'].user  # Получаем текущего аутентифицированного пользователя

        # Проверка, что только Admin, Manager или сам создатель задачи может обновить задачу
        if instance.creator != user and user.role not in ['Admin', 'Manager']:
            raise PermissionDenied("You don't have permission to update this task.")

        # Обновляем задачу
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
