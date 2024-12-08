import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiGetEntity, apiUpdateEntity, apiDeleteEntity } from '../api/api';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container mt-5">
      <h1 className="text-center mb-4">Редактирование проекта</h1>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {project && (
        <form>
          <div className="mb-3">
            <label className="form-label">Название</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Описание</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Кнопки действия */}
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

export default EditProjectPage;
