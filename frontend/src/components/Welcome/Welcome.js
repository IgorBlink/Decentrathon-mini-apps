import React, { useState } from 'react';
import './Welcome.css'; // CSS для стилей
import Guy from'../../Assets/LaptopGuy.gif';
import Choose from './Сhoose'; // Импортируем компонент Choose

const Welcome = () => {
  const [showChoosePage, setShowChoosePage] = useState(false); // Состояние для переключения страниц

  const handleContinueClick = () => {
    setShowChoosePage(true); // Переход на вторую страницу
  };

  if (showChoosePage) {
    return <Choose />; // Рендерим компонент Choose при переходе на вторую страницу
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
