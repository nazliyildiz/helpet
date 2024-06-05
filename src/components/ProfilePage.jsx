import React, { useState, useEffect } from 'react';
import './ProfilePage.css';

function ProfilePage({ userEmail, userName }) {
  const [name, setName] = useState(userName);
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
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
  const [arePostsVisible, setArePostsVisible] = useState(false);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAge, setIsEditingAge] = useState(false);
  const [isEditingOccupation, setIsEditingOccupation] = useState(false);
  const [isEditingHasPets, setIsEditingHasPets] = useState(false);

  useEffect(() => {
    const profileData = JSON.parse(localStorage.getItem(userEmail));
    if (profileData) {
      setName(profileData.name);
      setAge(profileData.age);
      setOccupation(profileData.occupation);
      setHasPets(profileData.hasPets);
      setProfileImage(profileData.profileImage);
    }

    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const userPosts = savedPosts.filter(post => post.userEmail === userEmail);
    setPosts(userPosts);
  }, [userEmail]);

  const handleProfileSave = () => {
    if (!name || !age || !occupation || !hasPets) {
      alert('Lütfen tüm alanları doldurun');
      return;
    }

    if (age <= 0) {
      alert('Yaş pozitif bir sayı olmalıdır');
      return;
    }

    const profileData = { userEmail, name, age, occupation, hasPets, profileImage };
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
      <div className="profile-card">
        <div className="profile-image">
          {profileImage ? <img src={profileImage} alt="Profil" /> : <p>Profil Resmi</p>}
          <input
            id="profile-image-input"
            type="file"
            accept="image/*"
            onChange={handleProfileImageUpload}
            style={{ display: 'none' }} // Varsayılan dosya girişini gizle
          />
          <label htmlFor="profile-image-input" className="custom-file-upload">
            Profil Resmi Seç
          </label>
          {showSaveButton && (
            <button onClick={handleSaveProfileImage}>Kaydet</button>
          )}
        </div>
        <div className="profile-info">
          <div className="info-item">
            <label>Ad Soyad:</label>
            {isEditingName ? (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <button onClick={() => { setIsEditingName(false); handleProfileSave(); }}>Kaydet</button>
              </>
            ) : (
              <>
                <p>{name}</p>
                <button onClick={() => setIsEditingName(true)}>Düzenle</button>
              </>
            )}
          </div>

          <div className="info-item">
            <label>Yaş:</label>
            {isEditingAge ? (
              <>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
                <button onClick={() => { setIsEditingAge(false); handleProfileSave(); }}>Kaydet</button>
              </>
            ) : (
              <>
                <p>{age}</p>
                <button onClick={() => setIsEditingAge(true)}>Düzenle</button>
              </>
            )}
          </div>

          <div className="info-item">
            <label>Meslek:</label>
            {isEditingOccupation ? (
              <>
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  required
                />
                <button onClick={() => { setIsEditingOccupation(false); handleProfileSave(); }}>Kaydet</button>
              </>
            ) : (
              <>
                <p>{occupation}</p>
                <button onClick={() => setIsEditingOccupation(true)}>Düzenle</button>
              </>
            )}
          </div>

          <div className="info-item">
            <label>Evcil Hayvan Durumu:</label>
            {isEditingHasPets ? (
              <>
                <select value={hasPets} onChange={(e) => setHasPets(e.target.value)} required>
                  <option value="">Seçin</option>
                  <option value="Evet">Evet</option>
                  <option value="Hayır">Hayır</option>
                </select>
                <button onClick={() => { setIsEditingHasPets(false); handleProfileSave(); }}>Kaydet</button>
              </>
            ) : (
              <>
                <p>{hasPets}</p>
                <button onClick={() => setIsEditingHasPets(true)}>Düzenle</button>
              </>
            )}
          </div>

          <p>Kullanıcı E-posta: {userEmail}</p>
        </div>
      </div>
      <div className="add-post">
        <button onClick={() => setIsFormVisible(!isFormVisible)} className="toggle-form-button">
          Sahiplendirme İlanı Ekle
        </button>
        {isFormVisible && (
          <div className="adoption-form-container">
            <form onSubmit={handleAddPost} className="adoption-form">
              <input
                type="text"
                placeholder="İsim"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Yaş"
                value={petAge}
                onChange={(e) => setPetAge(e.target.value)}
                required
              />
              <select value={petType} onChange={(e) => setPetType(e.target.value)} required>
                <option value="">Tür Seçin</option>
                <option value="Kedi">Kedi</option>
                <option value="Köpek">Köpek</option>
              </select>
              <select value={petStatus} onChange={(e) => setPetStatus(e.target.value)} required>
                <option value="">Durum Seçin</option>
                <option value="Sağlıklı">Sağlıklı</option>
                <option value="Engelli">Engelli</option>
              </select>
              <input
                type="text"
                placeholder="İl"
                value={locationCity}
                onChange={(e) => setLocationCity(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="İlçe"
                value={locationDistrict}
                onChange={(e) => setLocationDistrict(e.target.value)}
                required
              />
              <input
                id="pet-image-input"
                type="file"
                accept="image/*"
                onChange={handlePetImageUpload}
                style={{ display: 'none' }} // Varsayılan dosya girişini gizle
              />
              <label htmlFor="pet-image-input" className="custom-file-upload">
                İlan Resmi Seç
              </label>
              {petImage && <img src={petImage} alt="Pet" />}
              <button type="submit">İlan Ekle</button>
            </form>
          </div>
        )}
      </div>
      <div className="posts-list">
        <button onClick={() => setArePostsVisible(!arePostsVisible)} className="toggle-posts-button">
          İlanlarınız
        </button>
        {arePostsVisible && posts.map((post, index) => (
          <div key={index} className="post-item">
            {post.petImage && <img src={post.petImage} alt={post.petName} />}
            <h3>{post.petName}</h3>
            <p>Yaş: {post.petAge}</p>
            <p>Tür: {post.petType}</p>
            <p>Durum: {post.petStatus}</p>
            <p>Lokasyon: {post.locationCity}, {post.locationDistrict}</p>
            {post.adopted ? (
              <p>Sahiplendirildi</p>
            ) : (
              <button onClick={() => handleMarkAsAdopted(index)}>Sahiplendirildi olarak işaretle</button>
            )}
            <button onClick={() => handleDeletePost(index)}>Sil</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
