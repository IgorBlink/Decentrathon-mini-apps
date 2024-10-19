import React, { useState } from 'react';
import './Welcome.css'; // Используем стили отсюда

const SkillsPage = () => {
    const initialSkills = [
        'JavaScript', 'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Swift', 'C++', 'TypeScript', 'HTML', 
        'CSS', 'React', 'Angular', 'Vue.js', 'Node.js', 'Express', 'Django', 'Flask', 'Spring', 
        'Ruby on Rails', 'Go', 'Kotlin', 'Rust', 'Scala', 'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL', 
        'MySQL', 'Oracle', 'SwiftUI', 'Flutter', 'TensorFlow', 'Keras', 'Pandas', 'NumPy', 
        'Docker', 'Kubernetes', 'GraphQL', 'Next.js', 'Sass', 'Tailwind CSS', 'Bootstrap', 
        'jQuery', 'Redis', 'Elixir', 'Haskell', 'F#', 'Lua', 'MATLAB'
    ];
    
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [customSkills, setCustomSkills] = useState([]); // Для хранения кастомных скиллов
    const [customSkill, setCustomSkill] = useState('');
    const [suggestions, setSuggestions] = useState([]); // Для хранения предложений

    const toggleSkillSelection = (skill) => {
        setSelectedSkills((prevSelected) =>
            prevSelected.includes(skill)
                ? prevSelected.filter((s) => s !== skill) // Удаляем скилл, если он уже выбран
                : [...prevSelected, skill] // Добавляем скилл, если он еще не выбран
        );
    };

    const handleCustomSkillInputChange = (e) => {
        const value = e.target.value;
        setCustomSkill(value);

        // Отфильтровываем предложенные скиллы на основе ввода пользователя
        if (value) {
            const filteredSuggestions = [
                'F#', 'Haskell', 'Lua', 'MATLAB', 'R', 'COBOL', 'Dart', 'Pascal', 'Scratch', 
                'Crystal', 'Smalltalk', 'Prolog', 'OCaml', 'Elm', 'Erlang', 'Assembly', 
                'ActionScript', 'XSLT', 'PL/SQL', 'AWK', 'Tcl', 'J', 'ABAP', 'Pike', 'Nim'
            ].filter(skill =>
                skill.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]); // Если поле ввода пустое, очищаем предложения
        }
    };

    const handleSkillSelect = (skill) => {
        if (!selectedSkills.includes(skill) && !customSkills.includes(skill)) {
            setCustomSkills([...customSkills, skill]); // Добавляем новый кастомный скилл
            setSelectedSkills([...selectedSkills, skill]); // Также добавляем его в выбранные скиллы
        }
        setCustomSkill(''); // Очищаем поле ввода
        setSuggestions([]); // Убираем предложения после выбора
    };

    const handleCustomSkillToggle = (skill) => {
        setCustomSkills((prevCustomSkills) =>
            prevCustomSkills.filter((s) => s !== skill) // Удаляем кастомный скилл из списка
        );
        setSelectedSkills((prevSelected) =>
            prevSelected.filter((s) => s !== skill) // Удаляем его также из выбранных
        );
    };

    // Функция для получения выбранных навыков в виде массива
    const handleContinue = () => {
        const skillsToSend = [...selectedSkills, ...customSkills]; // Объединяем выбранные и кастомные навыки
        console.log(skillsToSend); // Здесь вы можете использовать skillsToSend для отправки на бэкэнд
        
        // Пример отправки на бэкэнд с использованием fetch
        /*
        fetch('YOUR_BACKEND_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ skills: skillsToSend }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        */
    };

    return (
        <div className="mobile-container">
            <div className="welcome-container">
                <h1 className="talents-title">Choose your talents</h1>
                <h2 className="subtitle">Please select at least 3 skills</h2>
                <div className="talents-skills-container">
                    {/* Рендерим существующие скиллы */}
                    {initialSkills.map((skill, index) => (
                        <div
                            key={index}
                            className={`talents-skill ${selectedSkills.includes(skill) ? 'selected' : ''}`}
                            onClick={() => toggleSkillSelection(skill)}
                        >
                            {skill}
                        </div>
                    ))}
                    {/* Рендерим кастомные скиллы */}
                    {customSkills.map((skill, index) => (
                        <div
                            key={`custom-${index}`}
                            className={`talents-skill selected`} // Кастомные скиллы по умолчанию будут выделены
                            onClick={() => handleCustomSkillToggle(skill)} // Де-селект кастомного скилла
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
