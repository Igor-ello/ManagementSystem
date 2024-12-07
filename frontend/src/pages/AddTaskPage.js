import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCreateTask } from '../api/api'; // Импорт функции для создания задачи
import 'bootstrap/dist/css/bootstrap.min.css';

const AddTaskPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'To Do',
        start_date: '',
        due_date: '',
        project: '',
        assignees: '',
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false); // Добавленное состояние загрузки
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true); // Включаем состояние загрузки

        try {
            const payload = {
                ...formData,
                assignees: formData.assignees
                    ? formData.assignees.split(',').map((id) => parseInt(id.trim()))
                    : [],
                project: parseInt(formData.project),
            };
            const response = await apiCreateTask(payload);

            // Проверяем успешность ответа
            if (response && JSON.stringify(response).includes('"id":')) {
                setSuccessMessage('Задача успешно создана!');
                setTimeout(() => navigate('/home'), 500);
            } else {
                setError('Не удалось создать задачу. Пожалуйста, попробуйте ещё раз.');
            }
        } catch (err) {
            setError(`Произошла ошибка: ${err.message || 'Неизвестная ошибка'}`);
        } finally {
            setLoading(false); // Отключаем состояние загрузки
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Добавить задачу</h1>
            {error && (
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
            )}
            {successMessage && (
                <div className="alert alert-success text-center" role="alert">
                    {successMessage}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Название</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Описание</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Статус</label>
                    <select
                        className="form-control"
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option>To Do</option>
                        <option>In Progress</option>
                        <option>Done</option>
                        <option>Blocked</option>
                        <option>In Review</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="start_date" className="form-label">Дата начала</label>
                    <input
                        type="date"
                        className="form-control"
                        id="start_date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="due_date" className="form-label">Дата завершения</label>
                    <input
                        type="date"
                        className="form-control"
                        id="due_date"
                        name="due_date"
                        value={formData.due_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="project" className="form-label">ID проекта</label>
                    <input
                        type="number"
                        className="form-control"
                        id="project"
                        name="project"
                        value={formData.project}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="assignees" className="form-label">Исполнители (IDs через запятую)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="assignees"
                        name="assignees"
                        value={formData.assignees}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        'Добавить задачу'
                    )}
                </button>
            </form>
        </div>
    );
};

export default AddTaskPage;
