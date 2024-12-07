import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AddProjectPage from './pages/AddProjectPage';
import AddTaskPage from './pages/AddTaskPage';
import AddUserPage from './pages/AddUserPage';
import { isAuthenticated } from './utils/auth'; // Импортируем функцию проверки авторизации

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={isAuthenticated() ? <HomePage /> : <Navigate to="/login" />} />
                <Route path="/add-project" element={isAuthenticated() ? <AddProjectPage /> : <Navigate to="/login" />} />
                <Route path="/add-task" element={isAuthenticated() ? <AddTaskPage /> : <Navigate to="/login" />} />
                <Route path="/add-user" element={isAuthenticated() ? <AddUserPage /> : <Navigate to="/login" />} />
                {/* Добавили маршрут для добавления проекта */}
            </Routes>
        </Router>
    );
};

export default App;
