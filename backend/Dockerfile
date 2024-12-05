# Используем официальный Python образ
FROM python:3.11-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY requirements.txt ./

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем все файлы проекта
COPY . .

# Открываем порт, который будет использовать Django
EXPOSE 8000

# Указываем команду для запуска сервера
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
