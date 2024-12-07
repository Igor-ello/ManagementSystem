import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProjectPage from './pages/ProjectPage';
import TaskPage from './pages/TaskPage';
import { Link } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/projects/1">Project 1</Link></li>
                    <li><Link to="/tasks/1">Task 1</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/projects/:id" element={<ProjectPage />} />
                <Route path="/tasks/:id" element={<TaskPage />} />
            </Routes>
        </Router>
    );
};

export default App;
