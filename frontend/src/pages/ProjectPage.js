import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiGetProjectDetails } from '../api/api'; // Функция для получения деталей проекта
import 'bootstrap/dist/css/bootstrap.min.css';

const ProjectPage = () => {
    const { id } = useParams(); // Получаем ID проекта из параметров URL
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProjectDetails = async () => {
            setLoading(true);
            setError('');

            try {
                const response = await apiGetProjectDetails(id); // Получаем данные проекта
                setProject(response.data.project);
                setTasks(response.data.tasks || []);
            } catch (err) {
                setError('Не удалось загрузить данные проекта. Попробуйте позже.');
            } finally {
                setLoading(false);
            }
        };

        fetchProjectDetails();
    }, [id]);

    return (
        <div className="container">
            <h2 className="mt-5">
                {loading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                    `Проект: ${project?.name || 'Не найден'}`
                )}
            </h2>

            {error && <div className="alert alert-danger mt-4">{error}</div>}

            {!loading && project && !error && (
                <>
                    <div className="mb-4">
                        <h4>Описание проекта</h4>
                        <p>{project.description || 'Описание отсутствует'}</p>
                        <p><strong>Дата создания:</strong> {project.created_at ? new Date(project.created_at).toLocaleDateString() : 'Не указана'}</p>
                        <p><strong>Владелец:</strong> {project.owner || 'Не указан'}</p>
                    </div>

                    <h3>Задачи проекта</h3>
                    {tasks.length > 0 ? (
                        <div className="row">
                            {tasks.map((task) => (
                                <div key={task.id} className="col-md-4 mb-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">{task.name}</h5>
                                            <p className="card-text">{task.description || 'Описание отсутствует'}</p>
                                            <Link to={`/tasks/${task.id}`} className="btn btn-primary">
                                                Подробнее
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted">Задачи отсутствуют</p>
                    )}
                </>
            )}
        </div>
    );
};

export default ProjectPage;
