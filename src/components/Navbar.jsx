import React from 'react';

function Navbar({ onLogout, setCurrentPage }) {
  return (
    <div className="navbar">
      <nav className="navbar-links">
        <a onClick={() => setCurrentPage('profile')}>Profil Sayfası</a>
        <a onClick={() => setCurrentPage('adoption')}>Sahiplendirme İlanları</a>
        <a onClick={() => setCurrentPage('foster')}>Süt Anne İlanları</a>
        <a onClick={() => setCurrentPage('inbox')}>Mesaj Kutusu</a>
        <a onClick={onLogout}>Çıkış Yap</a>
      </nav>
    </div>
  );
}

export default Navbar;

