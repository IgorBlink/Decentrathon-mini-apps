import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TelegramProvider } from './TelegramContext'; // Import your Telegram context provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <TelegramProvider>
        <App />
    </TelegramProvider>
);
