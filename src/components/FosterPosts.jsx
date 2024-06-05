import React from 'react';

function FosterPosts() {
  return (
    <div className="foster-posts">
      <h2>Süt Anne İlanları</h2>
      <p>YAKINDA Burada süt anne ilanları gösterilecektir.</p>
    </div>
  );
}

export default FosterPosts;


// import React, { useState, useEffect } from 'react';

// function FosterPosts() {
//   const [posts, setPosts] = useState([]);
//   const [petName, setPetName] = useState('');
//   const [petAge, setPetAge] = useState('');
//   const [petType, setPetType] = useState('');
//   const [petStatus, setPetStatus] = useState('');
//   const [petImage, setPetImage] = useState(null);
//   const [isFormVisible, setIsFormVisible] = useState(false);

//   useEffect(() => {
//     const savedPosts = JSON.parse(localStorage.getItem('fosterPosts')) || [];
//     setPosts(savedPosts);
//   }, []);

//   const handlePetImageUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPetImage(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleAddPost = (e) => {
//     e.preventDefault();
//     const newPost = { petName, petAge, petType, petStatus, petImage, adopted: false };
//     const savedPosts = JSON.parse(localStorage.getItem('fosterPosts')) || [];
//     const updatedPosts = [...savedPosts, newPost];
//     localStorage.setItem('fosterPosts', JSON.stringify(updatedPosts));
//     setPosts(updatedPosts);
//     setPetName('');
//     setPetAge('');
//     setPetType('');
//     setPetStatus('');
//     setPetImage(null);
//     document.getElementById('pet-image-input').value = ''; // Reset the file input
//     setIsFormVisible(false); // Hide the form after submission
//   };

//   const handleDeletePost = (index) => {
//     const savedPosts = JSON.parse(localStorage.getItem('fosterPosts')) || [];
//     const updatedPosts = savedPosts.filter((_, i) => i !== index);
//     localStorage.setItem('fosterPosts', JSON.stringify(updatedPosts));
//     setPosts(updatedPosts);
//   };

//   const handleMarkAsAdopted = (index) => {
//     const savedPosts = JSON.parse(localStorage.getItem('fosterPosts')) || [];
//     savedPosts[index].adopted = true;
//     localStorage.setItem('fosterPosts', JSON.stringify(savedPosts));
//     setPosts(savedPosts);
//   };

//   return (
//     <div className="foster-posts">
//       <h2>Süt Anne İlanları</h2>
//       <button onClick={() => setIsFormVisible(!isFormVisible)} className="toggle-form-button">
//         Süt Anne İlanı Ekle
//       </button>
//       {isFormVisible && (
//         <div className="adoption-form-container">
//           <h3>Anne bilgileri</h3>
//           <form onSubmit={handleAddPost} className="adoption-form">
//             <input
//               type="text"
//               placeholder="İsim"
//               value={petName}
//               onChange={(e) => setPetName(e.target.value)}
//               required
//             />
//             <input
//               type="number"
//               placeholder="Yaş"
//               value={petAge}
//               onChange={(e) => setPetAge(e.target.value)}
//               required
//             />
//             <select value={petType} onChange={(e) => setPetType(e.target.value)} required>
//               <option value="">Tür Seçin</option>
//               <option value="Kedi">Kedi</option>
//               <option value="Köpek">Köpek</option>
//             </select>
//             <select value={petStatus} onChange={(e) => setPetStatus(e.target.value)} required>
//               <option value="">Durum Seçin</option>
//               <option value="Sağlıklı">Sağlıklı</option>
//               <option value="Engelli">Engelli</option>
//             </select>
//             <input
//               id="pet-image-input"
//               type="file"
//               accept="image/*"
//               onChange={handlePetImageUpload}
//               style={{ display: 'none' }} // Hide the default file input element
//             />
//             <label htmlFor="pet-image-input" className="custom-file-upload">
//               İlan Resmi Seç
//             </label>
//             {petImage && <img src={petImage} alt="Pet" />}
//             <button type="submit">İlan Ekle</button>
//           </form>
//         </div>
//       )}
//       <div className="posts-list">
//         {posts.map((post, index) => (
//           <div key={index} className="post-item">
//             {post.petImage && <img src={post.petImage} alt={post.petName} />}
//             <h3>{post.petName}</h3>
//             <p>Yaş: {post.petAge}</p>
//             <p>Tür: {post.petType}</p>
//             <p>Durum: {post.petStatus}</p>
//             {post.adopted ? (
//               <p>Sahiplendirildi</p>
//             ) : (
//               <button onClick={() => handleMarkAsAdopted(index)}>Sahiplendirildi olarak işaretle</button>
//             )}
//             <button onClick={() => handleDeletePost(index)}>Sil</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default FosterPosts;
