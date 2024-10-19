import { createContext, useContext } from 'react';

// Создаем контекст
const TelegramContext = createContext(null);

// Провайдер для контекста
export const TelegramProvider = ({ children }) => {
    const tg = window?.Telegram?.WebApp;

    if (!tg) {
        console.warn('Telegram WebApp не инициализирован');
    }

    return (
        <TelegramContext.Provider value={{ tg }}>
            {children}
        </TelegramContext.Provider>
    );
};

// Хук для доступа к Telegram контексту
export const useTelegram = () => {
    return useContext(TelegramContext);
};
