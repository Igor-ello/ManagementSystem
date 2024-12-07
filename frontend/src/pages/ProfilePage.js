import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGetProfile } from '../api/api';

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
        <div className="spinner-border text-primary" role="status">
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="text-center mb-4">Профиль пользователя</h1>
              {user && (
                <div>
                  <h3>{user.first_name} {user.last_name}</h3>
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Роль:</strong> {user.role}</p>
                  <p><strong>ID пользователя:</strong> {user.id}</p> {/* Добавлено отображение ID */}
                </div>
              )}
              <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-primary" onClick={() => navigate('/home')}>Назад на главную</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
