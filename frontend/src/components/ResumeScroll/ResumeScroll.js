import React, { useState, useRef, useEffect } from 'react';
import './ResumeScroll.css'; // Импортируем стили для этого компонента
import Image from '../../Assets/image.png'; // Убедитесь, что путь к изображению правильный
import Footer from '../Footer/Footer';
const ResumeScroll = () => {
  const resumes = [
    { name: 'Резюме 1', description: 'Описание резюме 1' },
    { name: 'Резюме 2', description: 'Описание резюме 2' },
    { name: 'Резюме 3', description: 'Описание резюме 3' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [cardClass, setCardClass] = useState('');
  const [resetTimeout, setResetTimeout] = useState(null);
  const [hintVisible, setHintVisible] = useState(false); // Состояние для подсказки

  const cardRef = useRef(null);
  const containerRef = useRef(null);
  const hintTimeoutRef = useRef(null); // Ссылка на таймер подсказки

  const centerCard = () => {
    setSwipeOffset(0);
    setIsSwiping(false);
    setCardClass('');
  };

  useEffect(() => {
    setResetTimeout(setTimeout(centerCard, 3000)); // 3 секунды на возврат
    return () => clearTimeout(resetTimeout);
  }, [swipeOffset]);

  useEffect(() => {
    // Устанавливаем таймер для подсказки
    hintTimeoutRef.current = setTimeout(() => {
      setHintVisible(true);
    }, 5000); // Показываем подсказку через 5 секунд бездействия

    return () => clearTimeout(hintTimeoutRef.current);
  }, []);

  const handleSwipe = (direction) => {
    if (direction === 'left') {
      console.log('Дизлайк резюме:', resumes[currentIndex]);
      setCardClass('dislike');
    } else if (direction === 'right') {
      console.log('Лайк резюме:', resumes[currentIndex]);
      setCardClass('like');
    }

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % resumes.length);
      centerCard();
    }, 300);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setIsSwiping(true);
    clearTimeout(resetTimeout);
    clearTimeout(hintTimeoutRef.current); // Очищаем таймер подсказки при взаимодействии
    setHintVisible(false); // Скрываем подсказку при взаимодействии
  };

  const handleTouchMove = (e) => {
    const touchEnd = e.touches[0].clientX;
    const distance = touchEnd - touchStart;

    const containerWidth = containerRef.current.offsetWidth;
    const cardWidth = cardRef.current.offsetWidth;
    const maxSwipe = (containerWidth - cardWidth) / 2;

    setSwipeOffset(Math.max(-maxSwipe, Math.min(distance, maxSwipe)));
  };

  const handleTouchEnd = () => {
    const threshold = 10;

    if (Math.abs(swipeOffset) > threshold) {
      const direction = swipeOffset < 0 ? 'left' : 'right';
      handleSwipe(direction);
    } else {
      centerCard();
    }
  };

  const getCardStyle = () => {
    return {
      transform: `translateX(${swipeOffset}px) rotateZ(${(swipeOffset / 15).toFixed(1)}deg)`,
      opacity: 1,
    };
  };

  return (
    <div className="resume-page">
      <div
        className="resume-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={containerRef}
      >
        {resumes.length > 0 && (
          <div
            ref={cardRef}
            className={`resume-card ${cardClass}`}
            style={getCardStyle()}
          >
            <img
              src={Image}
              alt="Avatar"
              className="avatar"
            />
            <h2>{resumes[currentIndex].name}</h2>
            <p>{resumes[currentIndex].description}</p>
            <div className="skills-container">
              {['Python', 'JavaScript', 'Java', 'C++', 'React'].map((skill, index) => (
                <span key={index} className="skill">{skill}</span>
              ))}
            </div>
          </div>
        )}
        {isSwiping && (
          <div className={`swipe-indicator ${swipeOffset < 0 ? 'left' : 'right'}`}>
            {swipeOffset < 0 ? '👎' : '👍'}
          </div>
        )}
        {hintVisible && (
          <div className="hint-overlay">
            <div className="hint-content">
              <div className="arrow left">←</div>
              <div className="hint-text">Swipe left for Skip</div>
              <div className="arrow right">→</div>
              <div className="hint-text">Swipe right for Blink</div>
            </div>
          </div>
        )}
      </div>

      {/* Интеграция футера */}
      <Footer /> {/* Здесь добавляем футер */}
    </div>
  );
};

export default ResumeScroll;
