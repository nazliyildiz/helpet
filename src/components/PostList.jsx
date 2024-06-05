import React from 'react';

function PostList({ posts, handleMarkAsAdopted, handleDeletePost }) {
  return (
    <div className="posts-section">
           <div className="posts-list">
        {posts.map((post, index) => (
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

export default PostList;
