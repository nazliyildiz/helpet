import React, { useState } from 'react';
import './Register.css';

function Register({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [hasPet, setHasPet] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = () => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = existingUsers.find((user) => user.email === email);

    if (userExists) {
      setMessage('Bu e-posta adresiyle kayıtlı bir kullanıcı zaten var. Lütfen giriş yapın.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Şifreler eşleşmiyor');
      return;
    }

    const user = { name, email, password, age, hasPet };
    existingUsers.push(user);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    onRegister(user);
  };

  return (
    <div className="register-container">
      <h2>Kayıt Ol</h2>
      {message && <p>{message}</p>}
      <input
        type="text"
        placeholder="Ad Soyad"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <input
        type="password"
        placeholder="Şifreyi Doğrula"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <input
        type="number"
        placeholder="Yaş"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <select value={hasPet} onChange={(e) => setHasPet(e.target.value)}>
        <option value="">Evcil hayvanınız var mı?</option>
        <option value="yes">Evet</option>
        <option value="no">Hayır</option>
      </select>
      <button onClick={handleRegister}>Kayıt Ol</button>
    </div>
  );
}

export default Register;
