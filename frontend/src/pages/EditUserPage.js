import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiGetEntity, apiUpdateEntity, apiDeleteEntity } from '../api/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditUserPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [updatedData, setUpdatedData] = useState({});
    const token = localStorage.getItem('access_token');

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
        setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await apiUpdateEntity('users', id, updatedData, token);
            navigate('/home');
        } catch (err) {
            setError('Ошибка при сохранении изменений');
        }
    };

    const handleDelete = async () => {
        try {
            await apiDeleteEntity('users', id, token);
            navigate('/home');
        } catch (err) {
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

    if (error) {
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Редактирование пользователя</h1>
            {user && (
                <form>
                    <div className="mb-3">
                        <label className="form-label">Имя пользователя</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={updatedData.username || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={updatedData.email || ''}
                            onChange={handleInputChange}
                        />
                    </div>
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

export default EditUserPage;
