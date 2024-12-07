import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCreateTask } from '../api/api'; // Импортируем функцию для создания задачи

const AddTaskPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('To Do');
    const [dueDate, setDueDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [project, setProject] = useState('');
    const [assignees, setAssignees] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const assigneesArray = assignees.split(',').map((id) => parseInt(id.trim()));
            const taskData = {
                title,
                description,
                status,
                due_date: dueDate,
                start_date: startDate,
                project: parseInt(project),
                assignees: assigneesArray,
            };
            const result = await apiCreateTask(taskData);
            if (result.success) {
                navigate('/home');
            } else {
                setError('Ошибка при создании задачи.');
            }
        } catch (err) {
            setError('Произошла ошибка. Пожалуйста, попробуйте снова.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Добавить задачу</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Название задачи</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Описание задачи</label>
                    <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="3"
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
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                        <option value="Blocked">Blocked</option>
                        <option value="In Review">In Review</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="dueDate" className="form-label">Дата завершения</label>
                    <input
                        type="date"
                        className="form-control"
                        id="dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">Дата начала</label>
                    <input
                        type="date"
                        className="form-control"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="project" className="form-label">ID проекта</label>
                    <input
                        type="number"
                        className="form-control"
                        id="project"
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="assignees" className="form-label">Исполнители (IDs через запятую)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="assignees"
                        value={assignees}
                        onChange={(e) => setAssignees(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Создать задачу</button>
            </form>
        </div>
    );
};

export default AddTaskPage;
