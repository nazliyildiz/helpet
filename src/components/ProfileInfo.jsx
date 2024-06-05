import React, { useState } from 'react';

function ProfileInfo({ name, setName, age, setAge, hasPets, setHasPets, userEmail, handleProfileSave }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    handleProfileSave();
  };

  return (
    <div className="profile-info-container">
      <h3>Profil Bilgileri</h3>
      <div className="profile-info">
        <div className="info-item">
          <label>Ad Soyad:</label>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          ) : (
            <p>{name}</p>
          )}
        </div>

        <div className="info-item">
          <label>Yaş:</label>
          {isEditing ? (
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          ) : (
            <p>{age}</p>
          )}
        </div>

        <div className="info-item">
          <label>Evcil Hayvan Durumu:</label>
          {isEditing ? (
            <select value={hasPets} onChange={(e) => setHasPets(e.target.value)} required>
              <option value="">Seçin</option>
              <option value="Evet">Evet</option>
              <option value="Hayır">Hayır</option>
            </select>
          ) : (
            <p>{hasPets}</p>
          )}
        </div>

        <div className="info-item">
          <label>Email:</label>
          <p>{userEmail}</p>
        </div>

        {isEditing ? (
          <button onClick={handleSave}>Kaydet</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Düzenle</button>
        )}
      </div>
    </div>
  );
}

export default ProfileInfo;
