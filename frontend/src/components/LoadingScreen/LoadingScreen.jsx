// LoadingScreen.jsx
import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <div className="loading-animation"></div>
            <div className="loading-text">Загрузка...</div>
        </div>
    );
};

export default LoadingScreen; // Проверьте, что здесь используется export default
