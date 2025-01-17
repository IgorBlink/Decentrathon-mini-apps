import React, {useState} from 'react';
import './Welcome.css'; // CSS для стилей
import sunglassesEmoji from '../../Assets/money-face.gif'; // Изображения эмодзи
import smilingEmoji from '../../Assets/LaptopGuy.gif';
import {useTelegram} from '../../TelegramContext'; // Импортируйте хук для получения Telegram ID
import axios from 'axios'; // Импортируйте axios (если используете его)
import Employer from './Employer'; // Компонент Employer
import Talent from './Talent'; // Компонент Talent

const Choose = () => {
    const [selected, setSelected] = useState(null); // Состояние для отслеживания выбранной кнопки
    const [showNext, setShowNext] = useState(false); // Состояние для отображения следующего компонента
    const userId = useTelegram(); // Получаем Telegram ID из контекста

    const handleEmployerClick = () => {
        setSelected('employer'); // Устанавливаем состояние на 'employer'
        console.log("Employer button clicked");
    };

    const handleTalentClick = () => {
        setSelected('talent'); // Устанавливаем состояние на 'talent'
        console.log("Talent button clicked");
    };

    const handleContinue = async () => {
        setShowNext(true); // Переходим на следующий слайд независимо от результата запроса

    }

    // Рендерим либо экран выбора, либо следующий слайд в зависимости от состояния
    if (showNext) {
        if (selected === 'employer') {
            return <Employer/>;
        } else if (selected === 'talent') {
            return <Talent/>;
        }
    }

    return (
        <div className="mobile-container">
            <div className="emoji-container">
                <h1 className="second-page-title">Who are you, fren?</h1>

                <div
                    className={`emoji-button ${selected === 'employer' ? 'selected' : ''}`}
                    onClick={handleEmployerClick}
                >
                    <img src={sunglassesEmoji} alt="Employer" className="emoji-image"/>
                    <p className="emoji-label">Employer</p>
                </div>

                <div
                    className={`emoji-button ${selected === 'talent' ? 'selected' : ''}`}
                    onClick={handleTalentClick}
                >
                    <img src={smilingEmoji} alt="Talent" className="emoji-image"/>
                    <p className="emoji-label">Talent</p>
                </div>

                <p className="choose-destiny">Choose your destiny</p>

                {selected && ( // Кнопка Continue появляется только при выборе
                    <div className="continue-container">
                        <button className="continue-button" onClick={handleContinue}>
                            Continue
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Choose;
