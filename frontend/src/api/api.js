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

export const apiGetProjects = async () => {
    const response = await axios.get('/api/projects/');
    return response;
};

// Получение данных о проекте по ID
export const apiGetProjectDetails = async (projectId) => {
    const response = await axios.get(`/api/projects/${projectId}/`);
    return response;
};

// Получение данных о задаче по ID
export const apiGetTaskDetails = async (taskId) => {
    const response = await axios.get(`/api/tasks/${taskId}/`);
    return response;
};

// Обновление статуса задачи
export const apiUpdateTaskStatus = async (taskId, status) => {
    const response = await axios.patch(`/api/tasks/${taskId}/`, { status });
    return response;
};