import React, { useState } from 'react';
import './Welcome.css'; // Используем стили отсюда
import { useTelegram } from '../../TelegramContext'; // Импортируйте хук
import End from './End'; // Импортируем компонент End

const PositionsPage = () => {
    const { tg } = useTelegram(); // Получаем Telegram API
    const initialPositions = [
        'Software Engineer', 'Product Manager', 'Data Scientist', 'UX/UI Designer', 'Marketing Specialist',
        'Sales Manager', 'HR Specialist', 'Project Manager', 'DevOps Engineer', 'QA Engineer', 'System Analyst',
        'Content Creator', 'SEO Specialist', 'Business Analyst', 'Mobile Developer', 'Cybersecurity Specialist'
    ];

    const [selectedPositions, setSelectedPositions] = useState([]);
    const [customPositions, setCustomPositions] = useState([]);
    const [customPosition, setCustomPosition] = useState('');
    const [suggestions, setSuggestions] = useState([]); 
    const [showEndPage, setShowEndPage] = useState(false);

    if (showEndPage) {
        return <End />;
    }

    const togglePositionSelection = (position) => {
        setSelectedPositions((prevSelected) =>
            prevSelected.includes(position)
                ? prevSelected.filter((p) => p !== position)
                : [...prevSelected, position]
        );
    };

    const handleCustomPositionInputChange = (e) => {
        const value = e.target.value;
        setCustomPosition(value);
        // Логика для фильтрации предложений
        if (value) {
            const filteredSuggestions = ['Accountant', 'Legal Advisor', 'Office Manager', 'Financial Analyst', 'Recruiter'].filter(position =>
                position.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handlePositionSelect = (position) => {
        if (!selectedPositions.includes(position) && !customPositions.includes(position)) {
            setCustomPositions([...customPositions, position]);
            setSelectedPositions([...selectedPositions, position]);
        }
        setCustomPosition('');
        setSuggestions([]);
    };

    const handleCustomPositionToggle = (position) => {
        setCustomPositions((prevCustomPositions) =>
            prevCustomPositions.filter((p) => p !== position)
        );
        setSelectedPositions((prevSelected) =>
            prevSelected.filter((p) => p !== position)
        );
    };

    const handleContinue = () => {
        const userType = "employer"; // Устанавливаем тип пользователя для работодателя
        const positionsToSend = [...selectedPositions, ...customPositions]; // Объединяем выбранные и кастомные позиции
        const telegramID = tg?.initDataUnsafe?.user?.id || 803817300; // Получаем Telegram ID или используем тестовый

        console.log('Positions to send:', positionsToSend); // Логируем выбранные позиции
        console.log('Telegram ID:', telegramID); // Логируем Telegram ID

        // Отправка данных на бэкэнд
        fetch('https://942d-2a03-32c0-7000-7c7f-5438-a3a3-6420-61eb.ngrok-free.app/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ telegramID, userType, positions: positionsToSend }), // Отправляем userType, positions и telegramID
        })
        .then((response) => {
            if (response.ok) {
                setShowEndPage(true);
                // Можно добавить переход на другую страницу или показать сообщение
            } else {
                console.error('Ошибка при регистрации пользователя', response.status);
            }
        })
        .catch((error) => {
            console.error('Ошибка сети:', error);
        });
    };

    return (
        <div className="mobile-container">
            <div className="welcome-container">
                <h1 className="talents-title">Choose the positions you're looking for</h1>
                <h2 className="subtitle">Please select at least 3 positions</h2>
                <div className="talents-skills-container">
                    {initialPositions.map((position, index) => (
                        <div
                            key={index}
                            className={`talents-skill ${selectedPositions.includes(position) ? 'selected' : ''}`}
                            onClick={() => togglePositionSelection(position)}
                        >
                            {position}
                        </div>
                    ))}
                    {customPositions.map((position, index) => (
                        <div
                            key={`custom-${index}`}
                            className={`talents-skill selected`}
                            onClick={() => handleCustomPositionToggle(position)}
                        >
                            {position}
                        </div>
                    ))}
                </div>
                <div className="custom-skill-container">
                    <input
                        type="text"
                        value={customPosition}
                        onChange={handleCustomPositionInputChange}
                        placeholder="Type to search for positions..."
                        className="custom-skill-input"
                    />
                    {suggestions.length > 0 && (
                        <ul className="suggestions-list">
                            {suggestions.map((position, index) => (
                                <li key={index} onClick={() => handlePositionSelect(position)} className="suggestion-item">
                                    {position}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {selectedPositions.length >= 3 && (
                    <button className="continue-button" onClick={handleContinue}>Continue</button>
                )}
            </div>
        </div>
    );
};

export default PositionsPage;
