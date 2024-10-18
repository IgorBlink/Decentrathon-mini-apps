import React, { createContext, useContext, useEffect, useState } from 'react';

// Создание контекста
const TelegramContext = createContext();

// Провайдер контекста
export const TelegramProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (window.Telegram) {
      const user = window.Telegram.WebApp.initDataUnsafe.user;

      if (user && user.id) {
        setUserId(user.id);
        console.log('User ID:', user.id);
      } else {
        console.error('User ID не найден');
      }

      window.Telegram.WebApp.ready();
    } else {
      console.error('Telegram Web Apps API не доступен');
    }
  }, []);

  return (
    <TelegramContext.Provider value={userId}>
      {children}
    </TelegramContext.Provider>
  );
};

// Хук для использования контекста
export const useTelegram = () => {
  return useContext(TelegramContext);
};
