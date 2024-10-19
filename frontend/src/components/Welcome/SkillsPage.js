    import React, { useState } from 'react';
    import './Welcome.css'; // Используем стили отсюда
    import { useTelegram } from '../../TelegramContext'; // Импортируйте хук
    import End from './End'; // Импортируем компонент End

    const SkillsPage = () => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;

        const { tg } = useTelegram(); // Получаем Telegram API
        const initialSkills = [
            'JavaScript', 'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Swift', 'C++', 'TypeScript', 'HTML', 
            'CSS', 'React', 'Angular', 'Vue.js', 'Node.js', 'Express', 'Django', 'Flask', 'Spring', 
            'Ruby on Rails', 'Go', 'Kotlin', 'Rust', 'Scala', 'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL', 
            'MySQL', 'Oracle', 'SwiftUI', 'Flutter', 'TensorFlow', 'Keras', 'Pandas', 'NumPy', 
            'Docker', 'Kubernetes', 'GraphQL', 'Next.js', 'Sass', 'Tailwind CSS', 'Bootstrap', 
            'jQuery', 'Redis', 'Elixir', 'Haskell', 'F#', 'Lua', 'MATLAB'
        ];

        const grades = ['Intern', 'Junior', 'Middle', 'Senior', 'Teamlead'];

        const [selectedSkills, setSelectedSkills] = useState([]);
        const [customSkills, setCustomSkills] = useState([]);
        const [customSkill, setCustomSkill] = useState('');
        const [suggestions, setSuggestions] = useState([]); 
        const [showEndPage, setShowEndPage] = useState(false);
        const [grade, setGrade] = useState([]); // Изначально пустой массив

        const [step, setStep] = useState(1); // State to track the current step (grade or skill selection)

        if (showEndPage) {
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

        const handleGradeSelect = (grade) => {
            setGrade(grade); // Сохраняем выбранный грейд
        };

        const handleContinue = () => {
            if (step === 1 && grade) {
                setStep(2); // Переход к выбору навыков
            } else if (step === 2 && selectedSkills.length >= 3) {
                const userType = "talent"; // Устанавливаем тип пользователя
                const skillsToSend = [...selectedSkills, ...customSkills]; // Объединяем выбранные и кастомные навыки
                const telegramID = tg?.initDataUnsafe?.user?.id || 803817300; // Получаем Telegram ID или используем тестовый

                console.log('Grade:', grade); // Логируем выбранный грейд
                console.log('Skills to send:', skillsToSend); // Логируем выбранные навыки
                console.log('Telegram ID:', telegramID); // Логируем Telegram ID

                // Отправка данных на бэкэнд
                fetch(`${backendUrl}/api/users/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ telegramID, userType, grade, skills: skillsToSend }), // Отправляем userType, grade, skills и telegramID
                })
                .then((response) => {
                    if (response.ok) {
                        setShowEndPage(true);
                    } else {
                        console.error('Ошибка при регистрации пользователя', response.status);
                    }
                })
                .catch((error) => {
                    console.error('Ошибка сети:', error);
                });
            }
        };

        return (
            <div className="mobile-container">
                <div className="welcome-container">
                    {step === 1 ? (
                        <>
                            <h1 className="talents-title">Choose your level</h1>
                            <div className="talents-skills-container">
                                {grades.map((gradeOption, index) => (
                                    <div
                                        key={index}
                                        className={`talents-skill ${grade === gradeOption ? 'selected' : ''}`}
                                        onClick={() => handleGradeSelect(gradeOption)}
                                        style={{ transition: 'all 0.3s ease' }} // Плавная анимация
                                    >
                                        {gradeOption}
                                    </div>
                                ))}
                            </div>
                            {grade && (
                                <button className="continue-button" onClick={handleContinue}>Continue</button>
                            )}
                        </>
                    ) : (
                        <>
                            <h1 className="talents-title">Choose your skills</h1>
                            <h2 className="subtitle">Please select at least 3 skills</h2>
                            <div className="talents-skills-container">
                                {initialSkills.map((skill, index) => (
                                    <div
                                        key={index}
                                        className={`talents-skill ${selectedSkills.includes(skill) ? 'selected' : ''}`}
                                        onClick={() => toggleSkillSelection(skill)}
                                        style={{ transition: 'all 0.3s ease' }} // Плавная анимация
                                    >
                                        {skill}
                                    </div>
                                ))}
                                {customSkills.map((skill, index) => (
                                    <div
                                        key={`custom-${index}`}
                                        className={`talents-skill selected`}
                                        onClick={() => handleCustomSkillToggle(skill)}
                                        style={{ transition: 'all 0.3s ease' }} // Плавная анимация
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
                        </>
                    )}
                </div>
            </div>
        );
    };

    export default SkillsPage;
