import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiGetProjects, apiGetTasks, apiGetUsers, apiGetProfile } from '../../api/api';
import NavigationBar from 'components/NavigationBar/NavigationBar';
import Footer from 'components/Footer/Footer';
import './HomePage.scss';

const HomePage = () => {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/login');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectsResponse, tasksResponse, usersResponse, profileResponse] = await Promise.all([
                    apiGetProjects(),
                    apiGetTasks(),
                    apiGetUsers(),
                    apiGetProfile(localStorage.getItem('access_token')),
                ]);
                setProjects(projectsResponse.data);
                setTasks(tasksResponse.data);
                setUsers(usersResponse.data);
                setUser(profileResponse.data);
            } catch (err) {
                setError('Ошибка при загрузке данных. Пожалуйста, попробуйте позже.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <NavigationBar />

            <div className="homepage container">
                <h1 className="text-center">Добро пожаловать, {user ? user.first_name : 'пользователь'}!</h1>

                <div className="d-flex justify-content-between mb-4">
                    <button className="btn btn-outline" onClick={handleLogout}>Выйти</button>
                </div>

                {loading && (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                        <div className="spinner-border text-accent" role="status">
                            <span className="visually-hidden">Загрузка...</span>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="text-center text-danger fw-bold my-3">
                        {error}
                    </div>
                )}

                {!loading && !error && projects.length > 0 && (
                    <div>
                        <h3 className="section-title">Список проектов</h3>
                        <div className="row">
                            {projects.map((project) => (
                                <div key={project.id} className="col-md-4 mb-4">
                                    <div className="card h-100">
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
                                                <div className="text-muted">ID: {project.id}</div>
                                            </div>
                                            <Link to={`/projects/${project.id}`} className="btn btn-accent w-100 mt-2">Подробнее</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {!loading && !error && projects.length === 0 && (
                    <div className="text-center text-secondary fw-bold my-3">
                        Список проектов пуст. Добавьте новый проект, чтобы начать работу.
                    </div>
                )}

                {!loading && !error && tasks.length > 0 && (
                    <div>
                        <h3 className="section-title">Список задач</h3>
                        <div className="row">
                            {tasks.map((task) => (
                                <div key={task.id} className="col-md-4 mb-4">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <h5 className="card-title">{task.title}</h5>
                                                    <p className="card-text text-truncate">{task.description || 'Описание отсутствует'}</p>
                                                </div>
                                                <div className="text-muted">ID: {task.id}</div>
                                            </div>
                                            <Link to={`/tasks/${task.id}`} className="btn btn-accent w-100 mt-2">Подробнее</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {!loading && !error && tasks.length === 0 && (
                    <div className="text-center text-secondary fw-bold my-3">
                        Список задач пуст. Создайте новую задачу, чтобы начать работу.
                    </div>
                )}

                {!loading && !error && users.length > 0 && (
                    <div>
                        <h3 className="section-title">Список пользователей</h3>
                        <div className="row">
                            {users.map((user) => (
                                <div key={user.id} className="col-md-4 mb-4">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <h5 className="card-title">{user.username}</h5>
                                                    <p className="card-text text-truncate">{user.email}</p>
                                                </div>
                                                <div className="text-muted">ID: {user.id}</div>
                                            </div>
                                            <Link to={`/users/${user.id}`} className="btn btn-accent w-100 mt-2">Подробнее</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {!loading && !error && users.length === 0 && (
                    <div className="text-center text-secondary fw-bold my-3">
                        Список пользователей пуст. Добавьте нового пользователя, чтобы начать работу.
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
};

export default HomePage;
