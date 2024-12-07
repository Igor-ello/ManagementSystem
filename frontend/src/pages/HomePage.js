import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiGetProjects, apiGetTasks, apiGetUsers } from '../api/api'; // Импортируем функции для получения проектов, задач и пользователей
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Функция выхода
    const handleLogout = () => {
        localStorage.removeItem('access_token'); // Удаление токена
        navigate('/login'); // Перенаправление на страницу логина
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Параллельно запрашиваем проекты, задачи и пользователей
                const [projectsResponse, tasksResponse, usersResponse] = await Promise.all([
                    apiGetProjects(),
                    apiGetTasks(),
                    apiGetUsers(),
                ]);
                setProjects(projectsResponse.data);
                setTasks(tasksResponse.data);
                setUsers(usersResponse.data); // Сохраняем пользователей
            } catch (err) {
                setError('Ошибка при загрузке данных. Пожалуйста, попробуйте позже.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Добро пожаловать на главную страницу</h1>

            {/* Кнопки для профиля и выхода */}
            <div className="d-flex justify-content-between mb-4">
                <Link to="/profile" className="btn btn-secondary">Профиль</Link>
                <button className="btn btn-danger" onClick={handleLogout}>Выйти</button>
            </div>

            {/* Кнопки для перехода на страницы добавления */}
            <div className="text-center mb-4">
                <Link to="/add-project" className="btn btn-primary me-2">Добавить проект</Link>
                <Link to="/add-task" className="btn btn-primary me-2">Добавить задачу</Link>
                <Link to="/add-user" className="btn btn-primary">Добавить пользователя</Link>
            </div>

            {loading && (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </div>
                </div>
            )}

            {error && (
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
            )}

            {/* Список проектов */}
            {!loading && !error && projects.length > 0 && (
                <div>
                    <h3 className="mb-4">Список проектов</h3>
                    <div className="row">
                        {projects.map((project) => (
                            <div key={project.id} className="col-md-4 mb-4">
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src={`https://via.placeholder.com/300?text=${encodeURIComponent(project.name)}`}
                                        className="card-img-top"
                                        alt={project.name}
                                    />
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <h5 className="card-title">{project.name}</h5>
                                                <p className="card-text text-truncate">{project.description || 'Описание отсутствует'}</p>
                                            </div>
                                            <div className="text-muted">
                                                ID: {project.id} {/* Отображение ID на одном уровне */}
                                            </div>
                                        </div>
                                        <Link to={`/projects/${project.id}`} className="btn btn-primary w-100 mt-2">
                                            Подробнее
                                        </Link> {/* Отступ сверху от кнопки */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Если проекты не найдены */}
            {!loading && !error && projects.length === 0 && (
                <div className="alert alert-info text-center">
                    Список проектов пуст. Добавьте новый проект, чтобы начать работу.
                </div>
            )}

            {/* Список задач */}
            {!loading && !error && tasks.length > 0 && (
                <div>
                    <h3 className="mb-4">Список задач</h3>
                    <div className="row">
                        {tasks.map((task) => (
                            <div key={task.id} className="col-md-4 mb-4">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <h5 className="card-title">{task.title}</h5>
                                                <p className="card-text text-truncate">{task.description || 'Описание отсутствует'}</p>
                                            </div>
                                            <div className="text-muted">
                                                ID: {task.id} {/* Отображение ID на одном уровне */}
                                            </div>
                                        </div>
                                        <Link to={`/tasks/${task.id}`} className="btn btn-primary w-100 mt-2">
                                            Подробнее
                                        </Link> {/* Отступ сверху от кнопки */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Если задачи не найдены */}
            {!loading && !error && tasks.length === 0 && (
                <div className="alert alert-info text-center">
                    Список задач пуст. Создайте новую задачу, чтобы начать работу.
                </div>
            )}

            {/* Список пользователей */}
            {!loading && !error && users.length > 0 && (
                <div>
                    <h3 className="mb-4">Список пользователей</h3>
                    <div className="row">
                        {users.map((user) => (
                            <div key={user.id} className="col-md-4 mb-4">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <h5 className="card-title">{user.username}</h5>
                                                <p className="card-text text-truncate">{user.email}</p>
                                            </div>
                                            <div className="text-muted">
                                                ID: {user.id} {/* Отображение ID на одном уровне */}
                                            </div>
                                        </div>
                                        <Link to={`/users/${user.id}`} className="btn btn-primary w-100 mt-2">
                                            Подробнее
                                        </Link> {/* Отступ сверху от кнопки */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Если пользователи не найдены */}
            {!loading && !error && users.length === 0 && (
                <div className="alert alert-info text-center">
                    Список пользователей пуст. Добавьте нового пользователя, чтобы начать работу.
                </div>
            )}
        </div>
    );
};

export default HomePage;
