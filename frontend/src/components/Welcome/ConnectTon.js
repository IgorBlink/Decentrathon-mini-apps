import React from 'react';
import './Welcome.css'; // Подключаем стили
import Diamond from '../../Assets/diamond.gif';

const ConnectTon = () => {
    return (
        <>
            {/* Starry sky background */}
            <div className="starry-sky">
                <div className="stars"></div>
            </div>

            <div className="mobile-container">
                <div className="welcome-container">
                    <h1 className="welcome-title">Connect your TON Wallet!</h1>
                    <div className="welcome-image">
                        <img src={Diamond} alt="TON Wallet Logo" />
                    </div>
                    <p className="welcome-text">
                        Connect your TON Wallet to access our unique blockchain-based features. 
                        Secure transactions, digital asset management, and access to decentralized services 
                        are at your fingertips with TON Wallet.
                    </p>
                    
                    <button className="continue-button">Connect TON Wallet</button>
                </div>
            </div>
        </>
    );
};

export default ConnectTon;
