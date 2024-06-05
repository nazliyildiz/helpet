import React from 'react';

function AddPostPopup({
  petName,
  setPetName,
  petAge,
  setPetAge,
  petType,
  setPetType,
  petStatus,
  setPetStatus,
  petImage,
  handlePetImageUpload,
  locationCity,
  setLocationCity,
  locationDistrict,
  setLocationDistrict,
  handleAddPost,
  setIsFormVisible
}) {
  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => setIsFormVisible(false)}>×</button>
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
          <button type="button" onClick={() => setIsFormVisible(false)}>Geri Dön</button>
        </form>
      </div>
    </div>
  );
}

export default AddPostPopup;
