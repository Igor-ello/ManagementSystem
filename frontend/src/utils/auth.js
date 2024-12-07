export const isAuthenticated = () => {
    const token = localStorage.getItem('access_token');
    return token !== null; // Возвращает true, если токен есть, иначе false
};
