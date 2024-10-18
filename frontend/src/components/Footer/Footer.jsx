// Footer.jsx
import React from 'react';
import './Footer.css'; // Не забудьте создать этот файл для стилей
import profile from '../../Assets/profile.svg';
import swipes from '../../Assets/Swipes.svg';
import work from '../../Assets/Work.svg';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-icon">
        <img src={profile} alt="Profile" />
      </div>
      <div className="footer-icon">
        <img src={swipes} alt="Swipes" />
      </div>
      <div className="footer-icon">
        <img src={work} alt="Work" />
      </div>
    </div>
  );
};

export default Footer; // Убедитесь, что это присутствует
