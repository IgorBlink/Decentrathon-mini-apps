import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './components/Welcome/Welcome'; // Предполагается, что файл в той же директории
import ResumeScroll from './components/ResumeScroll/ResumeScroll'; // Импорт нового компонента
import './App.css';
import { TelegramProvider } from './TelegramContext';

function App() {
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
