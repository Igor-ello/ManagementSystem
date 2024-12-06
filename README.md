
# Project Management API

API для управления проектами, задачами, пользователями и постами. Поддерживает аутентификацию через JWT токены и CRUD операции для всех сущностей.

## Требования
- Python 3.8+
- Django
- Django REST Framework
- djangorestframework-simplejwt

## Установка и запуск

1. Клонируйте репозиторий:
    ```bash
    git clone https://github.com/your-repo.git
    cd your-repo
    ```

2. Установите зависимости:
    ```bash
    pip install -r requirements.txt
    ```

3. Примените миграции:
    ```bash
    python manage.py migrate
    ```

4. Запустите сервер разработки:
    ```bash
    python manage.py runserver
    ```

## Функционал API

### Аутентификация

#### Получение токенов
- **Метод:** `POST`
- **URL:** `/api/token/`
- **Тело запроса:** 
  ```json
  {
      "username": "your_username",
      "password": "your_password"
  }
  ```
- **Пример ответа:**
  ```json
  {
      "access": "your_access_token",
      "refresh": "your_refresh_token"
  }
  ```

---

### Пользователи

#### Регистрация пользователя
- **Метод:** `POST`
- **URL:** `/api/users/register`
- **Тело запроса:**
  ```json
  {
      "username": "new_user",
      "email": "newuser@example.com",
      "password": "yourpassword"
  }
  ```
- **Пример ответа:**
  ```json
  {
      "id": 1,
      "username": "new_user",
      "email": "newuser@example.com"
  }
  ```

#### Вход в систему
- **Метод:** `POST`
- **URL:** `/api/users/login`
- **Тело запроса:**
  ```json
  {
      "username": "new_user",
      "password": "yourpassword"
  }
  ```
- **Пример ответа:**
  ```json
  {
      "token": "your_jwt_token_here"
  }
  ```

#### Профиль пользователя
- **Методы:**
  - `GET` `/api/users/profile` — получить данные текущего пользователя.
  - `PUT` `/api/users/profile` — обновить профиль.
- **Пример тела запроса (для обновления):**
  ```json
  {
      "first_name": "UpdatedFirst",
      "last_name": "UpdatedLast"
  }
  ```
- **Пример ответа:**
  ```json
  {
      "id": 1,
      "username": "new_user",
      "email": "newuser@example.com",
      "first_name": "UpdatedFirst",
      "last_name": "UpdatedLast"
  }
  ```

---

### Проекты

#### Получение списка проектов
- **Метод:** `GET`
- **URL:** `/api/projects/`

#### Создание проекта
- **Метод:** `POST`
- **URL:** `/api/projects/`
- **Тело запроса:**
  ```json
  {
      "name": "New Project",
      "description": "Project Description",
      "start_date": "2024-12-05",
      "end_date": "2025-12-05"
  }
  ```
- **Пример ответа:**
  ```json
  {
      "id": 1,
      "name": "New Project",
      "description": "Project Description",
      "start_date": "2024-12-05",
      "end_date": "2025-12-05",
      "status": "Active"
  }
  ```

#### Обновление и удаление проекта
- **Методы:**
  - `PUT` `/api/projects/{id}/` — обновить проект.
  - `DELETE` `/api/projects/{id}/` — удалить проект.

---

### Задачи

#### Получение списка задач
- **Метод:** `GET`
- **URL:** `/api/tasks/`

#### Создание задачи
- **Метод:** `POST`
- **URL:** `/api/tasks/`
- **Тело запроса:**
  ```json
  {
      "title": "Task 1",
      "description": "Task description",
      "project": "http://localhost:8000/api/projects/1/",
      "due_date": "2024-12-31"
  }
  ```
- **Пример ответа:**
  ```json
  {
      "id": 1,
      "title": "Task 1",
      "description": "Task description",
      "project": "http://localhost:8000/api/projects/1/",
      "due_date": "2024-12-31"
  }
  ```

#### Обновление и удаление задачи
- **Методы:**
  - `PUT` `/api/tasks/{id}/` — обновить задачу.
  - `DELETE` `/api/tasks/{id}/` — удалить задачу.

---

### Посты

#### Получение списка постов
- **Метод:** `GET`
- **URL:** `/api/posts/`

#### Создание поста
- **Метод:** `POST`
- **URL:** `/api/posts/`
- **Тело запроса:**
  ```json
  {
      "title": "New Post",
      "content": "This is the content of the new post."
  }
  ```

#### Обновление и удаление поста
- **Методы:**
  - `PUT` `/api/posts/{id}/` — обновить пост.
  - `DELETE` `/api/posts/{id}/` — удалить пост.

---

## Пример авторизации
Добавьте в заголовок запроса:
```
Authorization: Bearer your_access_token
```

---

## Контактная информация
Если у вас есть вопросы или предложения, свяжитесь с нами через email: [support@example.com](mailto:support@example.com)
