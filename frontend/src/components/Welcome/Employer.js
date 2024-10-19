import React, { useState } from 'react';

import './Welcome.css'; // CSS для стилей
import money from '../../Assets/money-flying.gif'; // Изображение эмодзи
import PositionsPage from './PositionPage';
const TalentPage = () => {
    const [showChoosePage, setShowChoosePage] = useState(false); 
    const handleCreateClick = () => {
        setShowChoosePage(true);
    };
    if (showChoosePage) {
        return <PositionsPage />; // Рендерим компонент Choose при переходе на вторую страницу
    }

    return (
        <div className="mobile-container">
            <div className="talent-container">
                <div className="Sigma-Skibidi">
                    <h1 className="talent-title">Hey, employer!</h1>
                    <p className="talent-subtitle">
                        Great, you've registered as an employer! Now you can create your first job posting and start
                        your talent search. Our platform offers tools to easily manage vacancies and quickly find
                        candidates.
                    </p>
                </div>
                <div className="talent-image">
                    <img src={money} alt="employyer" className="emoji-image"/>
                </div>

                <div className="talent-next-steps">
                    <h3 className="next-steps-title">What can be done next?</h3>
                    <ul className="next-steps-list">
                        <li>1.Create a job posting in a couple minutes.</li>
                        <li>2.View real-time responses to job openings.</li>
                        <li>3.Start correspondence with candidates directly on the platform.</li>
                    </ul>
                </div>

               
                    <button className="continue-button" onClick={handleCreateClick}>
                        Explore opportunities
                    </button>
               
            </div>
        </div>
    );
};

export default TalentPage;
