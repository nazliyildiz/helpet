import React from 'react';
import './Navbar.css'


function Navbar({ onLogout, setCurrentPage }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-nav mr-auto">
        <a className="nav-item nav-link" onClick={() => setCurrentPage('profile')}>Profil Sayfası</a>
         <a className="nav-item nav-link" onClick={() => setCurrentPage('adoption')}>Sahiplendirme İlanları</a>
        <a className="nav-item nav-link" onClick={() => setCurrentPage('foster')}>Süt Anne İlanları</a>
        <a className="nav-item nav-link" onClick={() => setCurrentPage('inbox')}>Mesaj Kutusu</a>
        <a className="nav-item nav-link" onClick={onLogout}>Çıkış Yap</a>
      </div>
    </nav>
  );
}

export default Navbar;