
## Запросы

### Получение токена

* Метод: POST
* URL: http://localhost:8000/api/token/
Тело запроса: JSON
```json
{
    "username": "your_username",
    "password": "your_password"
}
```

После отправки запроса, если ваши данные правильные, вы получите ответ с токенами:

```json
{
    "access": "your_access_token",
    "refresh": "your_refresh_token"
}
```

---

### Получить список проектов
* Метод: GET
* URL: http://localhost:8000/api/projects/
* Тело запроса: Не нужно (только заголовки).
* Заголовки:
  * Authorization: Bearer <your_token> (если используете токен аутентификации)

### Создать новый проект
* Метод: POST
* URL: http://localhost:8000/api/projects/
* Тело запроса: JSON
```json
{
  "name": "New Project",
  "description": "Project Description",
  "start_date": "2024-12-05",
  "end_date": "2025-12-05"
}
```
* Заголовки:
  * Authorization: Bearer <your_token>
  * Content-Type: application/json

### Просмотр информации о конкретном проекте по ID
* Метод: GET
* URL: http://localhost:8000/api/projects/1/ (замените 1 на нужный ID)
* Заголовки:
  * Authorization: Bearer <your_token>

---

### Получить задачи для проекта
* Метод: GET
* URL: http://localhost:8000/api/tasks/
* Заголовки:
* Authorization: Bearer <your_token>
* Описание: Этот запрос возвращает все задачи.

### Создать новую задачу
* Метод: POST
* URL: http://localhost:8000/api/tasks/
* Тело запроса: JSON
```json
{
  "title": "Task 1",
  "description": "Task description",
  "project": "http://localhost:8000/api/projects/1/",
  "due_date": "2024-12-31"
}
```
* Заголовки:
  * Authorization: Bearer <your_token>
  * Content-Type: application/json
  * Описание: Создает задачу для проекта.

### Обновить задачу
* Метод: PUT
* URL: http://localhost:8000/api/tasks/1/ (предполагая, что задача с ID 1 существует)
* Тело запроса: JSON
```json
{
  "title": "Updated Task Title",
  "description": "Updated description",
  "project": "http://localhost:8000/api/projects/1/",
  "due_date": "2025-01-01"
}
```
* Заголовки:
  * Authorization: Bearer <your_token>
  * Content-Type: application/json
  * Описание: Обновляет существующую задачу.

### Удалить задачу по ID
* Метод: DELETE
* URL: http://localhost:8000/api/tasks/1/ (предполагая, что задача с ID 1 существует)
* Заголовки:
* Authorization: Bearer <your_token>

---

1. POST /api/users/register — Регистрация пользователя
Описание: Создаёт нового пользователя.
Тело запроса (Body):
json
Копировать код
{
  "username": "new_user",
  "email": "newuser@example.com",
  "password": "yourpassword"
}
Ответ: Статус 201 (Created) с данными о новом пользователе.
2. POST /api/users/login — Вход пользователя
Описание: Авторизует пользователя, возвращает JWT токен для авторизации.
Тело запроса (Body):
json
Копировать код
{
  "username": "new_user",
  "password": "yourpassword"
}
Ответ: Статус 200 (OK) с JWT токеном:
json
Копировать код
{
  "token": "your_jwt_token_here"
}
3. GET /api/users/profile — Просмотр профиля
Описание: Получить данные текущего пользователя (нужна авторизация с помощью JWT токена).
Заголовок (Header):
makefile
Копировать код
Authorization: Bearer your_jwt_token_here
Ответ: Статус 200 (OK) с данными пользователя:
json
Копировать код
{
  "id": 1,
  "username": "new_user",
  "email": "newuser@example.com",
  "first_name": "First",
  "last_name": "Last"
}
4. PUT /api/users/profile — Обновление профиля пользователя
Описание: Обновить данные пользователя (например, имя или email).
Заголовок (Header):
makefile
Копировать код
Authorization: Bearer your_jwt_token_here
Тело запроса (Body):
json
Копировать код
{
  "first_name": "UpdatedFirst",
  "last_name": "UpdatedLast"
}
Ответ: Статус 200 (OK) с обновлёнными данными:
json
Копировать код
{
  "id": 1,
  "username": "new_user",
  "email": "newuser@example.com",
  "first_name": "UpdatedFirst",
  "last_name": "UpdatedLast"
}
5. GET /api/posts — Получение всех постов
Описание: Получить список всех постов.
Ответ: Статус 200 (OK) с данными постов:
json
Копировать код
[
  {
    "id": 1,
    "title": "Post title",
    "content": "Post content"
  },
  {
    "id": 2,
    "title": "Another post title",
    "content": "Another post content"
  }
]
6. POST /api/posts — Создание нового поста
Описание: Создаёт новый пост.
Заголовок (Header):
makefile
Копировать код
Authorization: Bearer your_jwt_token_here
Тело запроса (Body):
json
Копировать код
{
  "title": "New Post",
  "content": "This is the content of the new post."
}
Ответ: Статус 201 (Created) с данными поста:
json
Копировать код
{
  "id": 3,
  "title": "New Post",
  "content": "This is the content of the new post."
}
7. GET /api/posts/{id} — Просмотр поста по ID
Описание: Получить конкретный пост по его ID.
Ответ: Статус 200 (OK) с данными поста:
json
Копировать код
{
  "id": 1,
  "title": "Post title",
  "content": "Post content"
}
8. PUT /api/posts/{id} — Обновление поста по ID
Описание: Обновить пост по его ID.
Заголовок (Header):
makefile
Копировать код
Authorization: Bearer your_jwt_token_here
Тело запроса (Body):
json
Копировать код
{
  "title": "Updated Post Title",
  "content": "Updated content of the post."
}
Ответ: Статус 200 (OK) с обновлёнными данными поста:
json
Копировать код
{
  "id": 1,
  "title": "Updated Post Title",
  "content": "Updated content of the post."
}
9. DELETE /api/posts/{id} — Удаление поста по ID
Описание: Удаляет пост по его ID.
Заголовок (Header):
makefile
Копировать код
Authorization: Bearer your_jwt_token_here
Ответ: Статус 204 (No Content), если пост был удалён успешно.