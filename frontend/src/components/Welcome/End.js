import React, { useState } from 'react';
import './Welcome.css'; // CSS для стилей
import crown from '../../Assets/crown.gif'; // Иконка короны
import { useTelegram } from '../../TelegramContext'; // Импортируйте хук
import { useNavigate } from 'react-router-dom'; // Импортируем хук для навигации

const End = () => {
    const { tg } = useTelegram(); // Получаем Telegram API
    const [loading, setLoading] = useState(true); // Состояние загрузки
    const navigate = useNavigate(); // Для навигации

    // Симуляция окончания загрузки
    useState(() => {
        setTimeout(() => {
            setLoading(false); // Прекращаем загрузку через некоторое время
        }, 2000); // 2 секунды ожидания
    }, []);

    // Отображаем загрузку, пока идет проверка
    if (loading) {
        return <div>Загрузка...</div>;
    }

    const handleContinueClick = () => {
        navigate('/swipes'); // Переход на следующую страницу
    };

    return (
        <div className="mobile-container">
            <div className="welcome-container">
                <h1 className="welcome-title">Registration Complete!</h1>
                <div className="welcome-image">
                    <img src={crown} alt="Crown GIF" />
                </div>
                <div className="welcome-text">
                    <p>Congratulations! You have successfully completed your registration. Get ready for an amazing journey ahead.</p>
                </div>
                <button className="continue-button" onClick={handleContinueClick}>Let's go!</button>
            </div>
        </div>
    );
};

export default End;
