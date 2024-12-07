import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api', // базовый URL для вашего API
    headers: {
        'Content-Type': 'application/json'
    }
});

export const apiLogin = async ({ username, password }) => {
    try {
        const response = await axiosInstance.post('/token/', { username, password });
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.detail || 'Ошибка авторизации. Проверьте логин и пароль.'
        };
    }
};

export const apiCreateProject = async (projectData) => {
    try {
        const response = await axios.post('http://localhost:8000/api/projects/', projectData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            }
        });
        return response.data; // Возвращаем данные с сервера
    } catch (error) {
        throw error; // Обрабатываем ошибку
    }
};

const API_BASE_URL = 'http://localhost:8000/api'; // Базовый URL для API

// Функция для получения списка проектов
export const apiGetProjects = async () => {
    const response = await axios.get(`${API_BASE_URL}/projects/`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
    });
    return response;
};

// Функция для получения списка задач
export const apiGetTasks = async () => {
    const response = await axios.get(`${API_BASE_URL}/tasks/`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
    });
    return response;
};
