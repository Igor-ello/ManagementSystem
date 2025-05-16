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
          {/* Заголовок карточки */}
          <div className="card-block__header">
            Добавить новый проект
          </div>

          {/* Тело карточки */}
          <div className="card-block__body">
            {error && <div className="text-danger fw-bold mb-3">{error}</div>}
            {success && <div className="text-accent fw-bold mb-3">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Название проекта</label>
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Введите название проекта"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">Описание проекта</label>
                <textarea
                  id="description"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Введите описание проекта"
                  required
                  rows={4}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="participants" className="form-label">
                  Участники проекта (IDs через запятую)
                </label>
                <input
                  id="participants"
                  type="text"
                  className="form-control"
                  value={participants}
                  onChange={(e) => setParticipants(e.target.value)}
                  placeholder="Введите ID участников через запятую"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="status" className="form-label">Статус</label>
                <select
                  id="status"
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </form>
          </div>

          {/* Футер карточки с кнопкой */}
          <div className="card-block__footer">
            <button
              type="submit"
              form="add-project-form"
              className="btn btn-dark"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading
                ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                : 'Создать проект'
              }
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AddProjectPage;
