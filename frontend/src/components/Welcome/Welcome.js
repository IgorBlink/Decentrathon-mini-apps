import React, { useEffect, useState } from 'react';
import './Welcome.css'; // CSS для стилей
import Guy from '../../Assets/LaptopGuy.gif';
import Choose from './Choose'; // Импортируем компонент Choose
import { useTelegram } from '../../TelegramContext'; // Импортируйте хук
import { useNavigate } from 'react-router-dom'; // Импортируем хук для навигации
import LoadingScreen from '../LoadingScreen/LoadingScreen'
const Welcome = () => {
    const { tg } = useTelegram(); // Получаем Telegram API
    const [showChoosePage, setShowChoosePage] = useState(false); // Состояние для переключения страниц
    const [loading, setLoading] = useState(true); // Состояние загрузки
    const navigate = useNavigate(); // Для навигации
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    useEffect(() => {
        // Получаем Telegram ID, если приложение открыто в Telegram
        const telegramID = tg?.initDataUnsafe?.user?.id || 803817300; // Если нет реального ID, используем тестовый

        console.log('Telegram ID:', telegramID); // Логируем Telegram ID

        // Отправляем запрос на сервер для проверки пользователя
        fetch(`${backendUrl}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ telegramID }), // Отправляем Telegram ID
        })
        .then((response) => {
            if (response.ok) {
                // Если пользователь существует, перенаправляем на страницу резюме
                navigate('/swipes');
            } else if (response.status === 404) {
                // Если пользователь не существует, показываем Welcome Page
                console.log('Пользователь не найден, показываем Welcome Page');
                setLoading(false); // Меняем состояние загрузки
            } else {
                // Обработка других возможных статусов
                console.error('Ошибка при проверке пользователя', response.status);
            }
        })
        .catch((error) => {
            console.error('Ошибка сети:', error);
        });
    }, [navigate, tg]); // Добавляем tg в зависимости useEffect

    // Отображаем загрузку, пока идет проверка
    if (loading) {
         return <LoadingScreen />;
    }

    const handleContinueClick = () => {
        setShowChoosePage(true); // Переход на вторую страницу
    };

    if (showChoosePage) {
        return <Choose/>;// Рендерим компонент Choose при переходе на вторую страницу
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
                <button className="continue-button" onClick={handleContinueClick}>Continue</button>
            </div>
        </div>
    );
};

export default Welcome;
