import React, { useState } from 'react';
import './Welcome.css'; // CSS для стилей
import smilingEmoji from '../../Assets/LaptopGuy.gif'; // Изображение эмодзи
import SkillsPage from './SkillsPage'; // Импортируем компонент SkillsPage

const TalentPage = () => {
    const [showChoosePage, setShowChoosePage] = useState(false); 
    const [skills, setSkills] = useState([]); // Состояние для хранения массива навыков

    const handleCreateProfileClick = () => {
        setShowChoosePage(true);
    };

    // Функция для отправки данных на сервер
    const handleSubmit = () => {
        const userType = "Talent"; // Устанавливаем тип пользователя
        fetch('https://942d-2a03-32c0-7000-7c7f-5438-a3a3-6420-61eb.ngrok-free.app/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userType, skills }), // Отправляем userType и skills
        })
        .then((response) => {
            if (response.ok) {
                console.log('Пользователь успешно зарегистрирован');
                // Можно добавить переход на другую страницу или показать сообщение
            } else {
                console.error('Ошибка при регистрации пользователя', response.status);
            }
        })
        .catch((error) => {
            console.error('Ошибка сети:', error);
        });
    };

    // Передаем функцию установки навыков в SkillsPage
    const handleSkillsUpdate = (newSkills) => {
        setSkills(newSkills);
    };

    if (showChoosePage) {
        return (
            <SkillsPage onSkillsUpdate={handleSkillsUpdate} onSubmit={handleSubmit} /> // Передаем функции как пропсы
        ); 
    }

    return (
        <div className="mobile-container">
            <div className="talent-container">
                <div className="Sigma-Skibidi">
                    <h1 className="talent-title">Hey, Talent!</h1>
                    <p className="talent-subtitle">
                        Great, you've registered as a talent! Now you can create your profile and start exploring new
                        job opportunities.
                    </p>
                </div>
                <div className="talent-image">
                    <img src={smilingEmoji} alt="Talent" className="emoji-image"/>
                </div>

                <div className="talent-next-steps">
                    <h3 className="next-steps-title">What can be done next?</h3>
                    <ul className="next-steps-list">
                        <li>1. Create a detailed profile in just a few minutes.</li>
                        <li>2. Explore job openings tailored to your skills.</li>
                        <li>3. Communicate with employers directly on the platform.</li>
                    </ul>
                </div>

                <div className="continue-container">
                    <button className="continue-button" onClick={handleCreateProfileClick}>
                        Show your talent
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TalentPage;
