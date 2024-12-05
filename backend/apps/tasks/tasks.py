from celery import shared_task
from django.core.mail import send_mail

@shared_task
def send_welcome_email(user_email):
    """Отправляет приветственное письмо пользователю"""
    send_mail(
        'Welcome to the Platform!',
        'Thank you for registering on our platform.',
        'noreply@yourdomain.com',
        [user_email],
        fail_silently=False,
    )
