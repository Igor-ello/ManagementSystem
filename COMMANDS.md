# Project Helper

## Запуск сборки проекта
```
docker-compose up --build -d
```

## Миграции
```
Remove-Item -Recurse -Force apps\api\migrations

python manage.py makemigrations

python manage.py migrate

python manage.py showmigrations
```