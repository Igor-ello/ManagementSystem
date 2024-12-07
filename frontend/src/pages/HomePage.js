import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGetProjects } from '../api/api'; // Импорт функции для получения проектов
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await apiGetProjects();
                setProjects(response.data);
            } catch (err) {
                setError('Ошибка при загрузке списка проектов. Пожалуйста, попробуйте позже.');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Добро пожаловать на главную страницу</h1>

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

            {!loading && !error && projects.length === 0 && (
                <div className="alert alert-info text-center">
                    Список проектов пуст. Добавьте новый проект, чтобы начать работу.
                </div>
            )}
        </div>
    );
};

export default HomePage;
