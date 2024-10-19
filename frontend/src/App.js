import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Убедись, что Router не импортируется здесь
import Welcome from './components/Welcome/Welcome';
import ResumeScroll from './components/ResumeScroll/ResumeScroll';
import { TelegramProvider } from './TelegramContext';
import './App.css';

function App() {
    return (
        <TelegramProvider>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/resumes" element={<ResumeScroll />} />
            </Routes>
        </TelegramProvider>
    );
}

export default App;
