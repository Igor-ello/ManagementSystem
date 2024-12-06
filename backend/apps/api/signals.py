from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.conf import settings
from .models import CustomUser


@receiver(post_migrate)
def create_admin_user(sender, **kwargs):
    """Создает суперпользователя при миграции, если он отсутствует"""
    if not CustomUser.objects.filter(username=settings.ADMIN_USERNAME).exists():
        CustomUser.objects.create_superuser(
            username=settings.ADMIN_USERNAME,
            password=settings.ADMIN_PASSWORD,
            email=settings.ADMIN_EMAIL,
            role=settings.ADMIN_ROLE,
            first_name=settings.ADMIN_FIRST_NAME,
            last_name=settings.ADMIN_LAST_NAME,
        )
