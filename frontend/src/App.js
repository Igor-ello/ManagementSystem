import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AddProjectPage from './pages/AddProjectPage';
import AddTaskPage from './pages/AddTaskPage';
import AddUserPage from './pages/AddUserPage';
import EditProjectPage from './pages/EditProjectPage';
import EditTaskPage from './pages/EditTaskPage';
import EditUserPage from './pages/EditUserPage';
import ProfilePage from "./pages/ProfilePage";
import { isAuthenticated } from './utils/auth';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={isAuthenticated() ? <ProfilePage /> : <Navigate to="/login" />} />
                <Route path="/home" element={isAuthenticated() ? <HomePage /> : <Navigate to="/login" />} />
                <Route path="/add-project" element={isAuthenticated() ? <AddProjectPage /> : <Navigate to="/login" />} />
                <Route path="/add-task" element={isAuthenticated() ? <AddTaskPage /> : <Navigate to="/login" />} />
                <Route path="/add-user" element={isAuthenticated() ? <AddUserPage /> : <Navigate to="/login" />} />
                <Route path="/projects/:id" element={isAuthenticated() ? <EditProjectPage /> : <Navigate to="/login" />} />
                <Route path="/tasks/:id" element={isAuthenticated() ? <EditTaskPage /> : <Navigate to="/login" />} />
                <Route path="/users/:id" element={isAuthenticated() ? <EditUserPage /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
