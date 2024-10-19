import React, { useState } from 'react';
import './Footer.css'; // Не забудьте создать этот файл для стилей
import profile from '../../Assets/profile.svg';
import swipes from '../../Assets/Swipes.svg';
import work from '../../Assets/Work.svg';

const Footer = () => {
  const [activeButton, setActiveButton] = useState('profile'); // Отслеживаем активную кнопку

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); // Устанавливаем активную кнопку
  };

  return (
    <div className="footer">
      <button
        className={`footer-button ${activeButton === 'profile' ? 'active' : ''}`}
        onClick={() => handleButtonClick('profile')}
      >
        <img src={profile} alt="Profile" className="footer-icon" />
      </button>
      <button
        className={`footer-button ${activeButton === 'swipes' ? 'active' : ''}`}
        onClick={() => handleButtonClick('swipes')}
      >
        <img src={swipes} alt="Swipes" className="footer-icon" />
      </button>
      <button
        className={`footer-button ${activeButton === 'work' ? 'active' : ''}`}
        onClick={() => handleButtonClick('work')}
      >
        <img src={work} alt="Work" className="footer-icon" />
      </button>
    </div>
  );
};

export default Footer;
