import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiGetEntity, apiUpdateEntity, apiDeleteEntity } from '../../api/api';
import NavigationBar from 'components/NavigationBar/NavigationBar';
import Footer from 'components/Footer/Footer';
import decoration from 'assets/decoration.svg';
import './EditProjectPage.scss';

const EditProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({ name: '', description: '' });
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await apiGetEntity('projects', id, token);
        setProject(response.data);
        setFormData({ name: response.data.name, description: response.data.description });
      } catch {
        setError('Ошибка при загрузке данных проекта');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await apiUpdateEntity('projects', id, formData, token);
      setSuccess('Проект успешно сохранен!');
      setTimeout(() => navigate('/home'), 500);
    } catch {
      setError('Ошибка при сохранении данных проекта');
    }
  };

  const handleDelete = async () => {
    try {
      await apiDeleteEntity('projects', id, token);
      setSuccess('Проект успешно удален!');
      setTimeout(() => navigate('/home'), 500);
    } catch {
      setError('Ошибка при удалении проекта');
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
          <form className="card-block__form">
            <h2 className="card-block__header mb-4">Редактировать проект</h2>

            {error && <div className="text-danger fw-bold mb-3">{error}</div>}
            {success && <div className="text-accent fw-bold mb-3">{success}</div>}

            <label className="card-block__label">Название проекта</label>
            <input
              type="text"
              className="card-block__input"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Введите название"
            />

            <label className="card-block__label">Описание проекта</label>
            <textarea
              className="card-block__textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Введите описание"
            />

            <div className="d-flex gap-3 mt-4">
              <button type="button" className="card-block__button" onClick={handleSave}>
                Сохранить
              </button>
              <button type="button" className="card-block__button btn-accent" onClick={handleDelete}>
                Удалить
              </button>
            </div>
          </form>

          <div className="card-block__decoration-wrapper">
            <img src={decoration} alt="Decoration" className="card-block__image" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EditProjectPage;
