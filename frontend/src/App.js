import React from 'react';
import Welcome from './components/Welcome/Welcome'; // Assuming the file is in the same directory
import './App.css'
import { TelegramProvider } from './TelegramContext';
function App() {
  return (
    <TelegramProvider>
    <div className="app">
      <Welcome />
    </div>
    </TelegramProvider>
  );
}

export default App;
