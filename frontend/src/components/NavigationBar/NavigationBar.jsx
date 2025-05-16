import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.scss';

const NavigationBar = () => {
    return (
        <nav className="navigation-bar navbar navbar-expand-lg">
            <div className="container">
                {/* Логотип */}
                <Link className="navbar-brand" to="/">
                    <img src="logo.svg" alt="Squadly Logo" className="logo"/>
                </Link>

                {/* Кнопка-бургер на мобильных */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Навигационные ссылки */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/add-project">Добавить проект</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/add-task">Добавить задачу</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/add-user">Добавить пользователя</Link>
                        </li>
                    </ul>

                    <Link to="/profile" className="btn btn-outline ms-3">Профиль</Link>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;