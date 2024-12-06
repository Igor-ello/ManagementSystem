from django.apps import AppConfig

class ApiConfig(AppConfig):
    """Конфигурация приложения api"""
    name = 'apps.api'

    def ready(self):
        """Импорт сигналов при готовности приложения"""
        from . import signals  # Используем относительный импорт
