import React from 'react';
import './Welcome.css'; // CSS для стилей
import smilingEmoji from '../../Assets/LaptopGuy.gif'; // Изображение эмодзи

const TalentPage = () => {
  const handleCreateProfileClick = () => {
    console.log("Create Profile button clicked");
    // Логика для создания профиля
  };

  return (
    <div className="mobile-container">
      <div className="talent-container">
        <div classNmae="Sigma-Skibidi">
        <h1 className="talent-title">Hey, Talent!</h1>
        <p className="talent-subtitle">
          Great, you've registered as a talent! Now you can create your profile and start exploring new job opportunities.
        </p>
        </div>
        <div className="talent-image">
          <img src={smilingEmoji} alt="Talent" className="emoji-image" />
        </div>

        <div className="talent-next-steps">
          <h3 className="next-steps-title">What can be done next?</h3>
          <ul className="next-steps-list">
            <li>1.Create a detailed profile in just a few minutes.</li>
            <li>2.Explore job openings tailored to your skills.</li>
            <li>3.Communicate with employers directly on the platform.</li>
          </ul>
        </div>

        <div className="continue-container">
            <button className="continue-button" >
              Show your talent
            </button>
          </div>
      </div>
    </div>
  );
};

export default TalentPage;
