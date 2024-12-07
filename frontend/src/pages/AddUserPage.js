import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCreateUser } from '../api/api'; // Импортируем функцию для создания пользователя

const AddUserPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('Employee');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false); // Состояние загрузки
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true); // Включаем состояние загрузки

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

            // Проверяем успешность ответа
            if (response && JSON.stringify(response).includes('"id":')) {
                setSuccessMessage('Пользователь успешно создан!');
                setTimeout(() => navigate('/home'), 500);
            } else {
                setError('Ошибка при создании пользователя. Пожалуйста, попробуйте ещё раз.');
            }
        } catch (err) {
            setError(`Произошла ошибка: ${err.message || 'Неизвестная ошибка.'}`);
        } finally {
            setLoading(false); // Отключаем состояние загрузки
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Добавить пользователя</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Имя пользователя</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Электронная почта</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Пароль</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">Имя</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Фамилия</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Роль</label>
                    <select
                        className="form-select"
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Employee">Employee</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        'Создать пользователя'
                    )}
                </button>
            </form>
        </div>
    );
};

export default AddUserPage;
