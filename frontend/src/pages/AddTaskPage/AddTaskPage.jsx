import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCreateTask } from '../../api/api';
import NavigationBar from 'components/NavigationBar/NavigationBar';
import Footer from 'components/Footer/Footer';
import './AddTaskPage.scss';
import decoration from "../../assets/decoration.svg";

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const payload = {
        ...formData,
        assignees: formData.assignees
          ? formData.assignees.split(',').map((id) => parseInt(id.trim()))
          : [],
        project: parseInt(formData.project),
      };
      const response = await apiCreateTask(payload);

      if (response && JSON.stringify(response).includes('"id":')) {
        setSuccessMessage('Задача успешно создана!');
        setTimeout(() => navigate('/home'), 500);
      } else {
        setError('Не удалось создать задачу. Пожалуйста, попробуйте ещё раз.');
      }
    } catch (err) {
      setError(`Произошла ошибка: ${err.message || 'Неизвестная ошибка'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavigationBar />

      <div className="container mt-5">
        <div className="card-block">
          <form onSubmit={handleSubmit} className="card-block__form" id="task-form">
            <h2 className="card-block__header mb-4">Добавить задачу</h2>

            {error && <div className="text-danger fw-bold mb-3">{error}</div>}
            {successMessage && <div className="text-accent fw-bold mb-3">{successMessage}</div>}

            <label htmlFor="title" className="card-block__label">Название</label>
            <input
                id="title"
                name="title"
                type="text"
                className="card-block__input"
                value={formData.title}
                onChange={handleChange}
                placeholder="Введите название задачи"
                required
            />

            <label htmlFor="description" className="card-block__label">Описание</label>
            <textarea
                id="description"
                name="description"
                className="card-block__textarea"
                value={formData.description}
                onChange={handleChange}
                placeholder="Введите описание задачи"
                rows={4}
                required
            />

            <label htmlFor="status" className="card-block__label">Статус</label>
            <select
                id="status"
                name="status"
                className="card-block__input"
                value={formData.status}
                onChange={handleChange}
                required
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="In Review">In Review</option>
              <option value="Done">Done</option>
              <option value="Blocked">Blocked</option>
            </select>

            <label htmlFor="start_date" className="card-block__label">Дата начала</label>
            <input
                id="start_date"
                name="start_date"
                type="date"
                className="card-block__input"
                value={formData.start_date}
                onChange={handleChange}
                required
            />

            <label htmlFor="due_date" className="card-block__label">Дата завершения</label>
            <input
                id="due_date"
                name="due_date"
                type="date"
                className="card-block__input"
                value={formData.due_date}
                onChange={handleChange}
                required
            />

            <label htmlFor="project" className="card-block__label">ID проекта</label>
            <input
                id="project"
                name="project"
                type="number"
                className="card-block__input"
                value={formData.project}
                onChange={handleChange}
                required
            />

            <label htmlFor="assignees" className="card-block__label">Исполнители (IDs через запятую)</label>
            <input
                id="assignees"
                name="assignees"
                type="text"
                className="card-block__input"
                value={formData.assignees}
                onChange={handleChange}
            />

            <button
                type="submit"
                className="card-block__button mt-4"
                disabled={loading}
            >
              {loading ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                  'Добавить задачу'
              )}
            </button>
          </form>

          <div className="card-block__decoration-wrapper">
            <img
                src={decoration}
                alt="Decoration"
                className="card-block__image"
            />
          </div>
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default AddTaskPage;
