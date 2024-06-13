import React, { useState, useEffect } from 'react';
import './MessageComponent.css';

function MessageComponent({ sender, receiver, post }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    const relevantMessages = savedMessages.filter(
      (msg) => (msg.sender === sender && msg.receiver === receiver && msg.postId === post.id) ||
               (msg.sender === receiver && msg.receiver === sender && msg.postId === post.id)
    );
    setMessages(relevantMessages);
  }, [sender, receiver, post.id]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const newMsg = {
      sender,
      receiver,
      message: newMessage,
      postId: post.id,
      petName: post.petName,
      petImage: post.petImage,
      timestamp: new Date().toISOString(),
    };
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    const updatedMessages = [...savedMessages, newMsg];
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
    setMessages(updatedMessages.filter(
      (msg) => (msg.sender === sender && msg.receiver === receiver && msg.postId === post.id) ||
               (msg.sender === receiver && msg.receiver === sender && msg.postId === post.id)
    ));
    setNewMessage('');
  };

  return (
    <div className="message-component-wrapper">
      <div className="message-component">
        <div className="messages-list">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === sender ? 'sent' : 'received'}`}>
              <p>{msg.message}</p>
              <span>{new Date(msg.timestamp).toLocaleString()}</span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Mesajınızı yazın..."
            required
          />
          <button type="submit">Gönder</button>
        </form>
      </div>
    </div>
  );
}

export default MessageComponent;