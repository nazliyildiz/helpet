import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import AdoptionPosts from './components/AdoptionPosts';
import Inbox from './components/Inbox';
import Navbar from './components/Navbar';
import FosterPosts from './components/FosterPosts'; // FosterPosts bileşenini ekledik

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('profile'); // profile, adoption, inbox, foster
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [messageData, setMessageData] = useState(null); // Mesaj verilerini ekledik

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      const profileData = JSON.parse(localStorage.getItem(email));
      if (profileData) {
        setIsAuthenticated(true);
        setUserEmail(email);
        setUserName(profileData.name);
      }
    }
  }, []);

  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setUserEmail(user.email);
    setUserName(user.name);
    localStorage.setItem('userEmail', user.email);
    setCurrentPage('profile');
  };

  const handleRegister = (user) => {
    setIsAuthenticated(true);
    setUserEmail(user.email);
    setUserName(user.name);
    localStorage.setItem('userEmail', user.email);
    setCurrentPage('profile');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('userEmail');
    setCurrentPage('profile');
  };

  const renderPage = () => {
    if (!isAuthenticated) {
      return <HomePage onLogin={handleLogin} onRegister={handleRegister} />;
    } else {
      switch (currentPage) {
        case 'profile':
          return <ProfilePage userEmail={userEmail} userName={userName} />;
        case 'adoption':
          return <AdoptionPosts setCurrentPage={setCurrentPage} setMessageData={setMessageData} />;
        case 'inbox':
          return <Inbox currentUser={userEmail} messageData={messageData} />;
        case 'foster':
          return <FosterPosts />;
        default:
          return <ProfilePage userEmail={userEmail} userName={userName} />;
      }
    }
  };

  return (
    <>
      {isAuthenticated && <Navbar onLogout={handleLogout} setCurrentPage={setCurrentPage} />}
      {renderPage()}
    </>
  );
}

export default App;
