import React from 'react';

function ProfileImageUpload({ profileImage, handleProfileImageUpload, handleSaveProfileImage, showSaveButton }) {
  return (
    <div className="profile-image-section">
      <h3>Profil Resmi</h3>
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
    </div>
  );
}

export default ProfileImageUpload;
