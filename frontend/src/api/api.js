import axios from 'axios';

export const apiLogin = async (credentials) => {
    const response = await axios.post('/api/auth/login/', credentials);
    return response;
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