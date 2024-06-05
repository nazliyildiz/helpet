import React, { useState } from 'react';
import ForgotPassword from './ForgotPassword';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleLogin = () => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = existingUsers.find((user) => user.email === email && user.password === password);
    
    if (user) {
      onLogin(user);
    } else {
      alert('Geçersiz email veya şifre');
    }
  };

  return forgotPassword ? (
    <ForgotPassword onBack={() => setForgotPassword(false)} />
  ) : (
    <div className="login-container">
      <h2>Giriş Yap</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Giriş Yap</button>
      <button onClick={() => setForgotPassword(true)}>Şifremi Unuttum</button>
    </div>
  );
}

export default Login;
