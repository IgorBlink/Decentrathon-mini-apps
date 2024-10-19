import React, { useState } from 'react';
import './Welcome.css'; // Используем стили отсюда
import { useTelegram } from '../../TelegramContext'; // Импортируйте хук
import End from './End'; // Импортируем компонент End

const SkillsPage = () => {
    const { tg } = useTelegram(); // Получаем Telegram API
    const initialSkills = [
        'JavaScript', 'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Swift', 'C++', 'TypeScript', 'HTML', 
        'CSS', 'React', 'Angular', 'Vue.js', 'Node.js', 'Express', 'Django', 'Flask', 'Spring', 
        'Ruby on Rails', 'Go', 'Kotlin', 'Rust', 'Scala', 'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL', 
        'MySQL', 'Oracle', 'SwiftUI', 'Flutter', 'TensorFlow', 'Keras', 'Pandas', 'NumPy', 
        'Docker', 'Kubernetes', 'GraphQL', 'Next.js', 'Sass', 'Tailwind CSS', 'Bootstrap', 
        'jQuery', 'Redis', 'Elixir', 'Haskell', 'F#', 'Lua', 'MATLAB'
    ];

    const [selectedSkills, setSelectedSkills] = useState([]);
    const [customSkills, setCustomSkills] = useState([]);
    const [customSkill, setCustomSkill] = useState('');
    const [suggestions, setSuggestions] = useState([]); 
    const [showChoosePage, setShowendPage] = useState(false);

   

    if (showChoosePage) {
        return <End />;
    }

    const toggleSkillSelection = (skill) => {
        setSelectedSkills((prevSelected) =>
            prevSelected.includes(skill)
                ? prevSelected.filter((s) => s !== skill)
                : [...prevSelected, skill]
        );
    };

    const handleCustomSkillInputChange = (e) => {
        const value = e.target.value;
        setCustomSkill(value);
        // Логика для фильтрации предложений
        if (value) {
            const filteredSuggestions = ['F#', 'Haskell', 'Lua', 'MATLAB', 'R', 'COBOL', 'Dart', 'Pascal', 'Scratch'].filter(skill =>
                skill.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSkillSelect = (skill) => {
        if (!selectedSkills.includes(skill) && !customSkills.includes(skill)) {
            setCustomSkills([...customSkills, skill]);
            setSelectedSkills([...selectedSkills, skill]);
        }
        setCustomSkill('');
        setSuggestions([]);
    };

    const handleCustomSkillToggle = (skill) => {
        setCustomSkills((prevCustomSkills) =>
            prevCustomSkills.filter((s) => s !== skill)
        );
        setSelectedSkills((prevSelected) =>
            prevSelected.filter((s) => s !== skill)
        );
    };

    const handleContinue = () => {
        const userType = "talent"; // Устанавливаем тип пользователя
        const skillsToSend = [...selectedSkills, ...customSkills]; // Объединяем выбранные и кастомные навыки
        const telegramID = tg?.initDataUnsafe?.user?.id || 803817300; // Получаем Telegram ID или используем тестовый

        console.log('Skills to send:', skillsToSend); // Логируем выбранные навыки
        console.log('Telegram ID:', telegramID); // Логируем Telegram ID

        // Отправка данных на бэкэнд
        fetch('https://942d-2a03-32c0-7000-7c7f-5438-a3a3-6420-61eb.ngrok-free.app/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ telegramID, userType, skills: skillsToSend,  }), // Отправляем userType, skills и telegramID
        })
        .then((response) => {
            if (response.ok) {
                setShowendPage(true);
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
                <h1 className="talents-title">Choose your talents</h1>
                <h2 className="subtitle">Please select at least 3 skills</h2>
                <div className="talents-skills-container">
                    {initialSkills.map((skill, index) => (
                        <div
                            key={index}
                            className={`talents-skill ${selectedSkills.includes(skill) ? 'selected' : ''}`}
                            onClick={() => toggleSkillSelection(skill)}
                        >
                            {skill}
                        </div>
                    ))}
                    {customSkills.map((skill, index) => (
                        <div
                            key={`custom-${index}`}
                            className={`talents-skill selected`}
                            onClick={() => handleCustomSkillToggle(skill)}
                        >
                            {skill}
                        </div>
                    ))}
                </div>
                <div className="custom-skill-container">
                    <input
                        type="text"
                        value={customSkill}
                        onChange={handleCustomSkillInputChange}
                        placeholder="Type to search for skills..."
                        className="custom-skill-input"
                    />
                    {suggestions.length > 0 && (
                        <ul className="suggestions-list">
                            {suggestions.map((skill, index) => (
                                <li key={index} onClick={() => handleSkillSelect(skill)} className="suggestion-item">
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {selectedSkills.length >= 3 && (
                    <button className="continue-button" onClick={handleContinue}>Continue</button>
                )}
            </div>
        </div>
    );
};

export default SkillsPage;
