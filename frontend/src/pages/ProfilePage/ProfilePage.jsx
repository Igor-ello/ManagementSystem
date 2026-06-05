import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGetProfile } from '../../api/api';
import './ProfilePage.scss';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Необходима авторизация');
        return;
      }

      try {
        const response = await apiGetProfile(token);
        setUser(response.data);
      } catch (err) {
        setError('Ошибка при загрузке профиля');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="spinner-border text-accent" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container profile-page">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card custom-card">
            <div className="card-body text-center">
              <h2 className="card-title">{user.first_name} {user.last_name}</h2>
              <p className="card-text"><strong>Имя пользователя:</strong> {user.username}</p>
              <p className="card-text"><strong>Email:</strong> {user.email}</p>
              <p className="card-text"><strong>Роль:</strong> {user.role}</p>
              <p className="card-text"><strong>ID:</strong> {user.id}</p>

              <button className="btn btn-outline mt-4" onClick={() => navigate('/home')}>
                Назад на главную
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
