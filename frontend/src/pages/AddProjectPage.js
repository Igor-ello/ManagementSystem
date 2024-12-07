import React, { useState } from 'react';
import { apiCreateProject } from '../api/api'; // Импортируем функцию для создания проекта
import 'bootstrap/dist/css/bootstrap.min.css';

const AddProjectPage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [participants, setParticipants] = useState('');
    const [status, setStatus] = useState('Active');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // Обработчик для отправки данных формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const participantsArray = participants.split(',').map((id) => parseInt(id.trim()));

        try {
            const projectData = {
                name,
                description,
                participants: participantsArray,
                status,
            };

            const result = await apiCreateProject(projectData); // Отправляем данные на сервер
            if (result.success) {
                setSuccess('Проект успешно создан!');
            } else {
                setError(result.message || 'Ошибка при создании проекта.');
            }
        } catch (err) {
            setError(`Произошла ошибка: ${err.message || 'Неизвестная ошибка'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Добавить новый проект</h1>

            {/* Уведомления об ошибке или успехе */}
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Название проекта</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Введите название проекта"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Описание проекта</label>
                    <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Введите описание проекта"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="participants" className="form-label">Участники проекта (IDs через запятую)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="participants"
                        value={participants}
                        onChange={(e) => setParticipants(e.target.value)}
                        placeholder="Введите ID участников через запятую"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Статус</label>
                    <select
                        className="form-select"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Archived</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        'Добавить проект'
                    )}
                </button>
            </form>
        </div>
    );
};

export default AddProjectPage;
