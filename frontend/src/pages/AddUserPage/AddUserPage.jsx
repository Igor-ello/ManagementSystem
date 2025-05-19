import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCreateUser } from '../../api/api';
import NavigationBar from 'components/NavigationBar/NavigationBar';
import Footer from 'components/Footer/Footer';
import './AddUserPage.scss';
import decoration from "../../assets/decoration.svg";

const AddUserPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('Employee');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const userData = {
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        role,
      };

      const response = await apiCreateUser(userData);

      if (response && JSON.stringify(response).includes('"id":')) {
        setSuccessMessage('Пользователь успешно создан!');
        setTimeout(() => navigate('/home'), 500);
      } else {
        setError('Ошибка при создании пользователя. Пожалуйста, попробуйте ещё раз.');
      }
    } catch (err) {
      setError(`Произошла ошибка: ${err.message || 'Неизвестная ошибка.'}`);
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
          <form onSubmit={handleSubmit} className="card-block__form" id="add-user-form">
            <h2 className="card-block__header mb-4">Добавить пользователя</h2>

            {error && <div className="text-danger fw-bold mb-3">{error}</div>}
            {successMessage && <div className="text-accent fw-bold mb-3">{successMessage}</div>}

            <label htmlFor="username" className="card-block__label">Имя пользователя</label>
            <input
                id="username"
                type="text"
                className="card-block__input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введите имя пользователя"
                required
            />

            <label htmlFor="email" className="card-block__label">Электронная почта</label>
            <input
                id="email"
                type="email"
                className="card-block__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Введите email"
                required
            />

            <label htmlFor="password" className="card-block__label">Пароль</label>
            <input
                id="password"
                type="password"
                className="card-block__input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                required
            />

            <label htmlFor="firstName" className="card-block__label">Имя</label>
            <input
                id="firstName"
                type="text"
                className="card-block__input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Введите имя"
                required
            />

            <label htmlFor="lastName" className="card-block__label">Фамилия</label>
            <input
                id="lastName"
                type="text"
                className="card-block__input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Введите фамилию"
                required
            />

            <label htmlFor="role" className="card-block__label">Роль</label>
            <select
                id="role"
                className="card-block__input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
            </select>

            <button
                type="submit"
                className="card-block__button mt-4"
                disabled={loading}
            >
              {loading ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                  'Создать пользователя'
              )}
            </button>
          </form>

          {/* Правая часть: декоративный блок */}
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

export default AddUserPage;
