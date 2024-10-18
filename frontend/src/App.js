import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './components/Welcome/Welcome'; // Предполагается, что файл в той же директории
import ResumeScroll from './components/ResumeScroll/ResumeScroll'; // Импорт нового компонента
import './App.css';
import { TelegramProvider } from './TelegramContext';

function App() {
    useEffect(() => {
        // Отключаем прокрутку страницы
        document.body.style.overflow = 'hidden';

        // Возвращаем прокрутку при размонтировании компонента
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <TelegramProvider>
            <Router>
                <div className="app">
                    <Routes>
                        <Route path="/" element={<Welcome />} />
                        <Route path="/resumes" element={<ResumeScroll />} />
                    </Routes>
                </div>
            </Router>
        </TelegramProvider>
    );
}

export default App;
