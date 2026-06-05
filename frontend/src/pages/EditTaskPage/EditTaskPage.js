import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiGetEntity, apiUpdateEntity, apiDeleteEntity } from '../../api/api';
import NavigationBar from 'components/NavigationBar/NavigationBar';
import Footer from 'components/Footer/Footer';
import './EditTaskPage.scss';
import decoration from "../../assets/decoration.svg";

const EditTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  const [task, setTask] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await apiUpdateEntity('tasks', id, updatedData, token);
      setSuccess('Задача успешно сохранена!');
      setTimeout(() => navigate('/home'), 500);
    } catch (err) {
      setError('Ошибка при сохранении изменений');
    }
  };

  const handleDelete = async () => {
    try {
      await apiDeleteEntity('tasks', id, token);
      setSuccess('Задача успешно удалена!');
      setTimeout(() => navigate('/home'), 500);
    } catch (err) {
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

  return (
    <>
      <NavigationBar />
      <div className="container mt-5">
        <div className="card-block">
          <form onSubmit={handleSave} className="card-block__form" id="edit-task-form">
            <h2 className="card-block__header mb-4">Редактировать задачу</h2>

            {error && <div className="text-danger fw-bold mb-3">{error}</div>}
            {success && <div className="text-accent fw-bold mb-3">{success}</div>}

            <label htmlFor="title" className="card-block__label">Название</label>
            <input
              id="title"
              name="title"
              type="text"
              className="card-block__input"
              value={updatedData.title || ''}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="description" className="card-block__label">Описание</label>
            <textarea
              id="description"
              name="description"
              className="card-block__textarea"
              value={updatedData.description || ''}
              onChange={handleInputChange}
              rows={4}
              required
            />

            <label htmlFor="status" className="card-block__label">Статус</label>
            <select
              id="status"
              name="status"
              className="card-block__input"
              value={updatedData.status || 'To Do'}
              onChange={handleInputChange}
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
              value={updatedData.start_date || ''}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="due_date" className="card-block__label">Дата завершения</label>
            <input
              id="due_date"
              name="due_date"
              type="date"
              className="card-block__input"
              value={updatedData.due_date || ''}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="project" className="card-block__label">ID проекта</label>
            <input
              id="project"
              name="project"
              type="number"
              className="card-block__input"
              value={updatedData.project || ''}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="assignees" className="card-block__label">Исполнители (IDs через запятую)</label>
            <input
              id="assignees"
              name="assignees"
              type="text"
              className="card-block__input"
              value={
                Array.isArray(updatedData.assignees)
                  ? updatedData.assignees.join(', ')
                  : updatedData.assignees || ''
              }
              onChange={handleInputChange}
            />

            <div className="d-flex gap-3 mt-4">
              <button type="submit" className="card-block__button">
                Сохранить
              </button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>
                Удалить
              </button>
            </div>
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
      <Footer />
    </>
  );
};

export default EditTaskPage;
