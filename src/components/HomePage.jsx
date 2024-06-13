import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import logo from '../assets/logo.png';
import pets2 from '../assets/pets2.png';
import './HomePage.css';


function HomePage({ onLogin, onRegister }) {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    document.title = 'Anasayfa';
  }, []);

  return (
    <div className="background-container" style={{ backgroundImage: `url(${pets2})` }}>
      <div className="home-container">
        <header className="header">
          <div className="logo">
            <img src={logo} alt="helPet Logo" />
            <h1>___Onun Kahramanı Sen Ol___</h1>
            <p>helPET</p>
          </div>
        </header>
        <div className="nav-buttons">
          <button onClick={() => setIsLogin(true)}>Giriş Yap</button>
          <button onClick={() => setIsLogin(false)}>Kayıt Ol</button>
        </div>
        <div className="form-content">
          {isLogin ? (
            <Login onLogin={onLogin} />
          ) : (
            <Register onRegister={onRegister} />
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
