import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiGetTaskDetails, apiUpdateTaskStatus } from '../api/api'; // API-функции
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskPage = () => {
    const { id } = useParams(); // ID задачи из параметров URL
    const [task, setTask] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchTaskDetails = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await apiGetTaskDetails(id); // Получаем данные задачи
                setTask(response.data.task || {});
                setComments(response.data.comments || []);
            } catch (err) {
                setError('Не удалось загрузить данные задачи. Попробуйте позже.');
            } finally {
                setLoading(false);
            }
        };

        fetchTaskDetails();
    }, [id]);

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            alert('Комментарий не может быть пустым.');
            return;
        }

        try {
            // API-запрос для добавления комментария (предполагается реализован)
            setComments([...comments, { text: newComment, id: Date.now() }]); // Обновление комментариев
            setNewComment(''); // Очистка поля
        } catch (err) {
            setError('Не удалось добавить комментарий. Попробуйте снова.');
        }
    };

    const handleChangeStatus = async (status) => {
        try {
            await apiUpdateTaskStatus(id, status); // API для изменения статуса
            setTask({ ...task, status }); // Обновление статуса
            alert(`Статус задачи изменен на "${status}"`);
        } catch (err) {
            setError('Не удалось обновить статус задачи. Попробуйте снова.');
        }
    };

    return (
        <div className="container">
            <h2 className="mt-5">
                {loading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                    `Задача: ${task?.name || 'Не найдена'}`
                )}
            </h2>

            {error && <div className="alert alert-danger mt-4">{error}</div>}

            {!loading && task && (
                <div>
                    <div className="mb-4">
                        <h4>Описание задачи</h4>
                        <p>{task.description || 'Описание отсутствует'}</p>
                        <p><strong>Дата создания:</strong> {task.created_at ? new Date(task.created_at).toLocaleDateString() : 'Не указана'}</p>
                        <p><strong>Исполнитель:</strong> {task.assignee || 'Не указан'}</p>
                        <p><strong>Статус:</strong> {task.status || 'Не указан'}</p>
                    </div>

                    {/* Кнопки для изменения статуса */}
                    <div>
                        {['In Progress', 'Completed'].map((status) => (
                            <button
                                key={status}
                                className={`btn ${status === 'Completed' ? 'btn-success' : 'btn-warning'} me-2`}
                                onClick={() => handleChangeStatus(status)}
                            >
                                {status === 'Completed' ? 'Завершена' : 'В процессе'}
                            </button>
                        ))}
                    </div>

                    <h3 className="mt-4">Комментарии</h3>
                    <div className="mb-4">
                        <textarea
                            value={newComment}
                            onChange={handleCommentChange}
                            className="form-control"
                            rows="3"
                            placeholder="Добавьте комментарий"
                        />
                        <button onClick={handleAddComment} className="btn btn-primary mt-2">
                            Добавить комментарий
                        </button>
                    </div>

                    <div>
                        {comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <div key={index} className="card mb-2">
                                    <div className="card-body">
                                        <p>{comment.text}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted">Комментариев пока нет</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskPage;
