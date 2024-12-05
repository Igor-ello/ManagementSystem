# Используем официальный Python образ
FROM python:3.11-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY requirements.txt .

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем весь проект
COPY .. .

# Открываем порт, который будет использовать Django
EXPOSE 8000

# Генерация, применение миграций, команда для запуска Django сервера
CMD ["sh", "-c", "python manage.py makemigrations --noinput && python manage.py migrate --noinput && python manage.py runserver 0.0.0.0:8000"]
