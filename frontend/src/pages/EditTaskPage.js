import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiGetEntity, apiUpdateEntity, apiDeleteEntity } from '../api/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditTaskPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [updatedData, setUpdatedData] = useState({});
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await apiGetEntity('tasks', id, token);
                setTask(response.data);
                setUpdatedData(response.data);
            } catch (err) {
                setError('Ошибка загрузки задачи');
            } finally {
                setLoading(false);
            }
        };
        fetchTask();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await apiUpdateEntity('tasks', id, updatedData, token);
            navigate('/home');
        } catch (err) {
            console.error('Error saving task:', err);  // Логируем ошибку при сохранении
            setError('Ошибка при сохранении изменений');
        }
    };

    const handleDelete = async () => {
        try {
            await apiDeleteEntity('tasks', id, token);
            navigate('/home');
        } catch (err) {
            console.error('Error deleting task:', err);  // Логируем ошибку при удалении
            setError('Ошибка при удалении задачи');
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Редактирование задачи</h1>
            {task && (
                <form>
                    <div className="mb-3">
                        <label className="form-label">Название</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={updatedData.title || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Описание</label>
                        <textarea
                            className="form-control"
                            name="description"
                            value={updatedData.description || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-success" onClick={handleSave}>
                            Сохранить
                        </button>
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>
                            Удалить
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditTaskPage;
