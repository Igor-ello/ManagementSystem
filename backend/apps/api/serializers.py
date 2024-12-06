from rest_framework import serializers
from .models import Project, Task, CustomUser
from rest_framework.exceptions import PermissionDenied


class ProjectSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField()  # Отображение владельца как строки
    participants = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), many=True)  # Участники

    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'owner', 'participants', 'created_at', 'status']


class CustomUserSerializer(serializers.ModelSerializer):
    admin_id = serializers.IntegerField(write_only=True)  # поле для ID администратора

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'role', 'admin_id']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # Извлекаем ID администратора из данных запроса
        admin_id = validated_data.pop('admin_id')

        # Находим пользователя, который инициирует создание
        try:
            admin_user = CustomUser.objects.get(id=admin_id)
        except CustomUser.DoesNotExist:
            raise PermissionDenied("Admin user does not exist.")  # Если такого пользователя нет

        # Проверяем, является ли он администратором
        if admin_user.role != 'Admin':
            raise PermissionDenied("You don't have permission to create a user.")  # Если не админ

        # Создаем нового пользователя
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
