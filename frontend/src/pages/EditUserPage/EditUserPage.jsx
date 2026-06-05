import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiGetEntity, apiUpdateEntity, apiDeleteEntity } from '../../api/api';
import NavigationBar from 'components/NavigationBar/NavigationBar';
import Footer from 'components/Footer/Footer';
import decoration from '../../assets/decoration.svg';
import './EditUserPage.scss';

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  const [user, setUser] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiGetEntity('users', id, token);
        setUser(response.data);
        setUpdatedData(response.data);
      } catch (err) {
        setError('Ошибка загрузки пользователя');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    try {
      await apiUpdateEntity('users', id, updatedData, token);
      setSuccessMessage('Пользователь успешно обновлён!');
      setTimeout(() => navigate('/home'), 500);
    } catch {
      setError('Ошибка при сохранении изменений');
    }
  };

  const handleDelete = async () => {
    setError('');
    setSuccessMessage('');
    try {
      await apiDeleteEntity('users', id, token);
      setSuccessMessage('Пользователь успешно удалён!');
      setTimeout(() => navigate('/home'), 500);
    } catch {
      setError('Ошибка при удалении пользователя');
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
          {/* Левая часть: форма */}
          <form onSubmit={handleSave} className="card-block__form" id="edit-user-form">
            <h2 className="card-block__header mb-4">Редактировать пользователя</h2>

            {error && <div className="text-danger fw-bold mb-3">{error}</div>}
            {successMessage && <div className="text-accent fw-bold mb-3">{successMessage}</div>}

            <label htmlFor="username" className="card-block__label">Имя пользователя</label>
            <input
              id="username"
              name="username"
              type="text"
              className="card-block__input"
              value={updatedData.username || ''}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="email" className="card-block__label">Электронная почта</label>
            <input
              id="email"
              name="email"
              type="email"
              className="card-block__input"
              value={updatedData.email || ''}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="first_name" className="card-block__label">Имя</label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              className="card-block__input"
              value={updatedData.first_name || ''}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="last_name" className="card-block__label">Фамилия</label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              className="card-block__input"
              value={updatedData.last_name || ''}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="role" className="card-block__label">Роль</label>
            <select
              id="role"
              name="role"
              className="card-block__input"
              value={updatedData.role || 'Employee'}
              onChange={handleInputChange}
            >
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
            </select>

            <div className="d-flex justify-content-between mt-4">
              <button type="submit" className="card-block__button">Сохранить</button>
              <button type="button" className="card-block__button card-block__button--danger" onClick={handleDelete}>
                Удалить
              </button>
            </div>
          </form>

          {/* Правая часть: декор */}
          <div className="card-block__decoration-wrapper">
            <img src={decoration} alt="Decoration" className="card-block__image" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EditUserPage;
