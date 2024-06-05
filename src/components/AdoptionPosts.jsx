import React, { useState, useEffect } from 'react';

function AdoptionPosts({ setCurrentPage, setMessageData }) { // Yeni props ekledik
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('userEmail'));

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(savedPosts);
  }, []);

  const handleDeletePost = (index) => {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = savedPosts.filter((_, i) => i !== index);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  const handleMarkAsAdopted = (index) => {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    savedPosts[index].adopted = true;
    localStorage.setItem('posts', JSON.stringify(savedPosts));
    setPosts(savedPosts);
  };

  const handleStartChat = (post) => {
    setMessageData({
      sender: currentUser,
      receiver: post.userEmail,
      postId: post.id,
      petName: post.petName,
      petImage: post.petImage,
    });
    setCurrentPage('inbox');
  };

  return (
    <div className="adoption-posts">
      <h2>Sahiplendirme İlanları</h2>
      <div className="posts-list">
        {posts.map((post, index) => (
          <div key={index} className="post-item">
            {post.petImage && <img src={post.petImage} alt={post.petName} />}
            <h3>{post.petName}</h3>
            <p>Yaş: {post.petAge}</p>
            <p>Tür: {post.petType}</p>
            <p>Durum: {post.petStatus}</p>
            <p>Lokasyon: {post.locationCity}, {post.locationDistrict}</p>
            
            <button onClick={() => handleStartChat(post)}>Mesaj Gönder</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdoptionPosts;
