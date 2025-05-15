import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
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

// Проекты
export const apiCreateProject = async (projectData) => {
    const response = await axiosInstance.post('/projects/', projectData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
    });
    return response.data;
};

export const apiGetProjects = async () => {
    const response = await axiosInstance.get('/projects/', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
    });
    return response;
};

// Задачи
export const apiGetTasks = async () => {
    const response = await axiosInstance.get('/tasks/', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
    });
    return response;
};

export const apiCreateTask = async (taskData) => {
    const response = await axiosInstance.post('/tasks/', taskData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
    });
    return response.data;
};

// Пользователи
export const apiGetUsers = async () => {
    const response = await axiosInstance.get('/users/', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
    });
    return response;
};

export const apiCreateUser = async (userData) => {
    const response = await axiosInstance.post('/users/', userData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
    });
    return response.data;
};

// Профиль
export const apiGetProfile = async (token) => {
    const response = await axiosInstance.get('/profile/', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response;
};

// Универсальные CRUD-функции
export const apiGetEntity = async (entityType, id, token) => {
    const response = await axiosInstance.get(`/${entityType}/${id}/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response;
};

export const apiUpdateEntity = async (entityType, id, data, token) => {
    const response = await axiosInstance.patch(`/${entityType}/${id}/`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response;
};

export const apiDeleteEntity = async (entityType, id, token) => {
    const response = await axiosInstance.delete(`/${entityType}/${id}/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response;
};
