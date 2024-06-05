import React, { useState, useEffect } from 'react';
import ProfileImageUpload from './ProfileImageUpload';
import ProfileInfo from './ProfileInfo';
import PostList from './PostList';
import AddPostPopup from './AddPostPopup';
import './ProfilePage.css';

function ProfilePage({ userEmail, userName }) {
  const [name, setName] = useState(userName);
  const [age, setAge] = useState('');
  const [hasPets, setHasPets] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [petName, setPetName] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petType, setPetType] = useState('');
  const [petStatus, setPetStatus] = useState('');
  const [petImage, setPetImage] = useState(null);
  const [locationCity, setLocationCity] = useState('');
  const [locationDistrict, setLocationDistrict] = useState('');
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const profileData = JSON.parse(localStorage.getItem(userEmail));
    if (profileData) {
      setName(profileData.name);
      setAge(profileData.age);
      setHasPets(profileData.hasPets);
      setProfileImage(profileData.profileImage);
    }

    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const userPosts = savedPosts.filter(post => post.userEmail === userEmail);
    setPosts(userPosts);
  }, [userEmail]);

  const handleProfileSave = () => {
    if (!name || !age || !hasPets) {
      alert('Lütfen tüm alanları doldurun');
      return;
    }

    if (age <= 0) {
      alert('Yaş pozitif bir sayı olmalıdır');
      return;
    }

    const profileData = { userEmail, name, age, hasPets, profileImage };
    localStorage.setItem(userEmail, JSON.stringify(profileData));
    alert('Profil bilgileri kaydedildi!');
  };

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      setShowSaveButton(true); // Dosya seçildikten sonra kaydet butonunu göster
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfileImage = () => {
    setShowSaveButton(false);
    handleProfileSave();
  };

  const handlePetImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPetImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    const newPost = {
      userEmail,
      petName,
      petAge,
      petType,
      petStatus,
      petImage,
      locationCity,
      locationDistrict,
      adopted: false
    };
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = [...savedPosts, newPost];
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts.filter(post => post.userEmail === userEmail));
    setPetName('');
    setPetAge('');
    setPetType('');
    setPetStatus('');
    setPetImage(null);
    setLocationCity('');
    setLocationDistrict('');
    document.getElementById('pet-image-input').value = ''; // Dosya inputunu sıfırla
    setIsFormVisible(false); // Form gönderildikten sonra gizle
  };

  const handleDeletePost = (index) => {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = savedPosts.filter((_, i) => i !== index);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts.filter(post => post.userEmail === userEmail));
  };

  const handleMarkAsAdopted = (index) => {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    savedPosts[index].adopted = true;
    localStorage.setItem('posts', JSON.stringify(savedPosts));
    setPosts(savedPosts.filter(post => post.userEmail === userEmail));
  };

  return (
    <div className="profile-page">
      <h2>Profil Sayfası</h2>
      <div className="profile-header">
        <div className="profile-image-section">
          <ProfileImageUpload
            profileImage={profileImage}
            handleProfileImageUpload={handleProfileImageUpload}
            handleSaveProfileImage={handleSaveProfileImage}
            showSaveButton={showSaveButton}
          />
        </div>
        <div className="profile-info-section profile-section">
          <ProfileInfo
            name={name}
            setName={setName}
            age={age}
            setAge={setAge}
            hasPets={hasPets}
            setHasPets={setHasPets}
            userEmail={userEmail}
            handleProfileSave={handleProfileSave}
          />
        </div>
      </div>
      <div className="profile-section">
        <div className="posts-header">
          <h3>Sahiplendirme İlanları</h3>
          <button onClick={() => setIsFormVisible(true)} className="add-post-button">
            İlan Ekle
          </button>
        </div>
        {isFormVisible && (
          <AddPostPopup
            petName={petName}
            setPetName={setPetName}
            petAge={petAge}
            setPetAge={setPetAge}
            petType={petType}
            setPetType={setPetType}
            petStatus={petStatus}
            setPetStatus={setPetStatus}
            petImage={petImage}
            handlePetImageUpload={handlePetImageUpload}
            locationCity={locationCity}
            setLocationCity={setLocationCity}
            locationDistrict={locationDistrict}
            setLocationDistrict={setLocationDistrict}
            handleAddPost={handleAddPost}
            setIsFormVisible={setIsFormVisible}
          />
        )}
        <PostList
          posts={posts}
          handleMarkAsAdopted={handleMarkAsAdopted}
          handleDeletePost={handleDeletePost}
        />
      </div>
    </div>
  );
}

export default ProfilePage;
