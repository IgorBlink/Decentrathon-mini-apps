import React, { useState } from 'react';
import './Welcome.css'; // CSS для стилей
import sunglassesEmoji from '../../Assets/money-face.gif'; // Изображения эмодзи
import smilingEmoji from '../../Assets/LaptopGuy.gif';

const Choose = () => {
  const [selected, setSelected] = useState(null); // Состояние для отслеживания выбранной кнопки

  const handleEmployerClick = () => { 
    setSelected('employer'); // Устанавливаем состояние на 'employer'
    console.log("Employer button clicked");
  };

  const handleTalentClick = () => {
    setSelected('talent'); // Устанавливаем состояние на 'talent'
    console.log("Talent button clicked");
  };

  return (
    <div className="mobile-container">
      <div className="emoji-container">
        <h1 className="second-page-title">Who are you, fren?</h1>

        <div
          className={`emoji-button ${selected === 'employer' ? 'selected' : ''}`}
          onClick={handleEmployerClick}
        >
          <img src={sunglassesEmoji} alt="Employer" className="emoji-image" />
          <p className="emoji-label">Employer</p>
        </div>

        <div
          className={`emoji-button ${selected === 'talent' ? 'selected' : ''}`}
          onClick={handleTalentClick}
        >
          <img src={smilingEmoji} alt="Talent" className="emoji-image" />
          <p className="emoji-label">Talent</p>
        </div>

        <p className="choose-destiny">Choose your destiny</p>

        {selected && ( // Кнопка Continue появляется только при выборе
          <div className="continue-container">
            <button className="continue-button" onClick={() => console.log("Continue clicked")}>
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Choose;
