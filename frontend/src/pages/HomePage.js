import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGetProjects, apiGetTasks } from '../api/api'; // Импортируем функции для получения проектов и задач
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Параллельно запрашиваем проекты и задачи
                const [projectsResponse, tasksResponse] = await Promise.all([
                    apiGetProjects(),
                    apiGetTasks(),
                ]);
                setProjects(projectsResponse.data);
                setTasks(tasksResponse.data);
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

            {/* Кнопка для открытия модального окна */}
            <div className="text-center mb-4">
                <button className="btn btn-success" onClick={() => setShowModal(true)}>
                    Добавить новый проект
                </button>
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
                                        <h5 className="card-title">{project.name}</h5>
                                        <p className="card-text text-truncate">{project.description || 'Описание отсутствует'}</p>
                                        <Link to={`/projects/${project.id}`} className="btn btn-primary w-100">
                                            Подробнее
                                        </Link>
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
                                        <h5 className="card-title">{task.name}</h5>
                                        <p className="card-text text-truncate">{task.description || 'Описание отсутствует'}</p>
                                        <Link to={`/tasks/${task.id}`} className="btn btn-primary w-100">
                                            Подробнее
                                        </Link>
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
        </div>
    );
};

export default HomePage;
