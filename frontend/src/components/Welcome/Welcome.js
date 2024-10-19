// Welcome.js
import React, { useEffect, useState } from 'react';
import './Welcome.css';
import Guy from '../../Assets/LaptopGuy.gif';
import Choose from './Сhoose'; // Импортируем компонент Choose
import { useTelegram } from '../../TelegramContext'; // Импортируем хук

const Welcome = () => {
    const userId = useTelegram(); // Получаем ID пользователя из контекста
    const [userExists, setUserExists] = useState(null); // Состояние для проверки существования пользователя
    const [showChoosePage, setShowChoosePage] = useState(false); // Состояние для переключения страниц

    // Проверяем существование пользователя при загрузке компонента
    useEffect(() => {
        const checkUserExistence = async () => {
            if (userId) {
                const response = await fetch('https://942d-2a03-32c0-7000-7c7f-5438-a3a3-6420-61eb.ngrok-free.app/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ telegramId: userId }),
                });

                const data = await response.json();
                setUserExists(data.exists); // Предполагаем, что ответ содержит поле 'exists'
            }
        };

        checkUserExistence();
    }, [userId]);

    // Если пользователя нет, показываем Choose компонент
    if (userExists === false) {
        return <Choose />;
    }

    // Если мы еще не получили ответ о существовании пользователя
    if (userExists === null) {
        return <div>Loading...</div>; // Индикатор загрузки
    }

    return (
        <div className="mobile-container">
            <div className="welcome-container">
                <h1 className="welcome-title">Welcome to BlinkHunter!</h1>
                <div className="welcome-image">
                    <img src={Guy} alt="Working GIF" />
                </div>
                <div className="welcome-text">
                    <p>We believe in developing talent and are committed to helping each employee realize their potential.</p>
                </div>
                <button className="continue-button" onClick={() => setShowChoosePage(true)}>Continue</button>
            </div>
        </div>
    );
};

export default Welcome;
