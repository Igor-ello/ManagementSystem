import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCreateProject } from '../../api/api';
import NavigationBar from 'components/NavigationBar/NavigationBar';
import Footer from 'components/Footer/Footer';
import './AddProjectPage.scss';

const AddProjectPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [participants, setParticipants] = useState('');
  const [status, setStatus] = useState('Active');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const participantsArray = participants
      .split(',')
      .map((id) => parseInt(id.trim()));

    try {
      const projectData = { name, description, participants: participantsArray, status };
      const response = await apiCreateProject(projectData);

      if (response && JSON.stringify(response).includes('"id":')) {
        setSuccess('Проект успешно создан!');
        setTimeout(() => navigate('/home'), 500);
      } else {
        setError('Ошибка при создании проекта. Пожалуйста, попробуйте ещё раз.');
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
          {/* Левая часть: форма */}
          <form onSubmit={handleSubmit} className="card-block__form" id="add-project-form">
            <h2 className="card-block__header mb-4">Добавить новый проект</h2>

            {error && <div className="text-danger fw-bold mb-3">{error}</div>}
            {success && <div className="text-accent fw-bold mb-3">{success}</div>}

            <label htmlFor="name" className="card-block__label">Название проекта</label>
            <input
              id="name"
              type="text"
              className="card-block__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите название проекта"
              required
            />

            <label htmlFor="description" className="card-block__label">Описание проекта</label>
            <textarea
              id="description"
              className="card-block__textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Введите описание проекта"
              rows={4}
              required
            />

            <label htmlFor="participants" className="card-block__label">Участники проекта (IDs через запятую)</label>
            <input
              id="participants"
              type="text"
              className="card-block__input"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              placeholder="Введите ID участников"
              required
            />

            <label htmlFor="status" className="card-block__label">Статус</label>
            <select
              id="status"
              className="card-block__input"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Archived">Archived</option>
            </select>

            <button
              type="submit"
              className="card-block__button mt-4"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                'Создать проект'
              )}
            </button>
          </form>

          {/* Правая часть: декоративный блок */}
          <div className="card-block__decoration">
            {/* Пример SVG-декорации */}
            <svg width="200" height="200" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="50" fill="#B9FF66" />
              <path d="M50 15 L61 85 L50 65 L39 85 Z" fill="black" />
            </svg>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AddProjectPage;
