import React, { useState, useRef, useEffect } from 'react';
import './ResumeScroll.css'; // Импортируем стили для этого компонента
import Footer from '../Footer/Footer';
import { useTelegram } from '../../TelegramContext'; // Импортируйте хук
import LoadingScreen from '../LoadingScreen/LoadingScreen'; // Импортируем экран загрузки

const ResumeScroll = () => {
  const { tg } = useTelegram(); // Получаем Telegram API
  const [vacancies, setVacancies] = useState([]); // Состояние для хранения вакансий
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [cardClass, setCardClass] = useState('');
  const [resetTimeout, setResetTimeout] = useState(null);
  const [hintVisible, setHintVisible] = useState(false); // Состояние для подсказки
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const telegramID = tg?.initDataUnsafe?.user?.id || 803817300;
  const cardRef = useRef(null);
  const containerRef = useRef(null);
  const hintTimeoutRef = useRef(null); // Ссылка на таймер подсказки

  useEffect(() => {
    const fetchVacancies = async (telegramID) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/vacancy/get-vacancy`, {
          method: 'POST', // Изменено на POST
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify({ telegramID }), // Отправляем Telegram ID в теле запроса
        });

        const data = await response.json();

        if (data.success) {
          setVacancies(data.data.matchingVacancies); // Сохраняем вакансии в состоянии
        } else {
          console.error('Ошибка при загрузке вакансий:', data);
        }
      } catch (error) {
        console.error('Ошибка при запросе:', error);
      } finally {
        setLoading(false); // Устанавливаем состояние загрузки в false после завершения запроса
      }
    };

    fetchVacancies(telegramID); // Вызов функции загрузки резюме
  }, [telegramID]); // Указываем зависимости

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
      console.log('Дизлайк вакансии:', vacancies[currentIndex]);
      setCardClass('dislike');
    } else if (direction === 'right') {
      console.log('Лайк вакансии:', vacancies[currentIndex]);
      setCardClass('like');
    }

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % vacancies.length);
      centerCard();
    }, 300);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches ? e.touches[0].clientX : e.clientX); // Определяем, касание или мышь
    setIsSwiping(true);
    clearTimeout(resetTimeout);
    clearTimeout(hintTimeoutRef.current); // Очищаем таймер подсказки при взаимодействии
    setHintVisible(false); // Скрываем подсказку при взаимодействии
  };

  const handleTouchMove = (e) => {
    const touchEnd = e.touches ? e.touches[0].clientX : e.clientX; // Определяем, касание или мышь
    const distance = touchEnd - touchStart;

    const containerWidth = containerRef.current.offsetWidth;
    const cardWidth = cardRef.current.offsetWidth;
    const maxSwipe = (containerWidth - cardWidth) / 2;

    setSwipeOffset(Math.max(-maxSwipe, Math.min(distance, maxSwipe)));
  };

  const handleTouchEnd = () => {
    const threshold = 5;

    if (Math.abs(swipeOffset) > threshold) {
      const direction = swipeOffset < 0 ? 'left' : 'right';
      handleSwipe(direction);
    } else {
      centerCard();
    }
  };

  // Обработчики для ПК
  const handleMouseDown = (e) => {
    handleTouchStart(e); // Используем ту же логику для начала свайпа
  };

  const handleMouseMove = (e) => {
    if (isSwiping) {
      handleTouchMove(e); // Используем ту же логику для движения свайпа
    }
  };

  const handleMouseUp = () => {
    handleTouchEnd(); // Используем ту же логику для завершения свайпа
  };

  const getCardStyle = () => {
    return {
      transform: `translateX(${swipeOffset}px) rotateZ(${(swipeOffset / 15).toFixed(1)}deg)`,
      opacity: 1,
    };
  };

  if (loading) {
    return <LoadingScreen />; // Показываем экран загрузки, пока данные загружаются
  }

  return (
    <div className="resume-page">
      <div
        className="resume-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown} // Добавлено для ПК
        onMouseMove={handleMouseMove} // Добавлено для ПК
        onMouseUp={handleMouseUp} // Добавлено для ПК
        ref={containerRef}
      >
        {vacancies.length > 0 && (
          <div
            ref={cardRef}
            className={`resume-card ${cardClass}`}
            style={getCardStyle()}
          >
            <img
  src={`data:image/png;base64,${vacancies[currentIndex]?.photo}`} // Убедитесь, что здесь нет пробелов или ошибок
  alt="Avatar"
  className="avatar"
/>

            <h2>{vacancies[currentIndex]?.grades.join(', ')}</h2> {/* Отображаем уровни */}
            <p>{vacancies[currentIndex]?.skills.join(', ')}</p> {/* Отображаем навыки */}
            <div className="skills-container">
              {vacancies[currentIndex]?.skills.map((skill, index) => (
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
