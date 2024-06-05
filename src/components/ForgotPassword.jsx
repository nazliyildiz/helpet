import React, { useState } from 'react';
import './ForgotPassword.css';

function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = existingUsers.find((user) => user.email === email);

    if (!user) {
      setMessage('Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı.');
      return;
    }

    // Bu bölümde backend servisi kullanarak e-posta göndermelisiniz
    setMessage('Şifreniz e-posta adresinize gönderildi.');
  };

  return (
    <div className="form-container">
      <h2>Şifremi Unuttum</h2>
      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Şifreyi Gönder</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={onBack}>Geri Dön</button>
    </div>
  );
}

export default ForgotPassword;
