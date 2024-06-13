import React, { useState, useEffect } from 'react';
import MessageComponent from './MessageComponent';
import './Inbox.css';

function Inbox({ currentUser, messageData }) {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(null);

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    const userMessages = savedMessages.filter(
      (msg) => msg.sender === currentUser || msg.receiver === currentUser
    );
    setMessages(userMessages);
  }, [currentUser]);

  useEffect(() => {
    if (messageData) {
      setCurrentMessage(messageData);
    }
  }, [messageData]);

  const handleDeleteMessage = (index) => {
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    const updatedMessages = savedMessages.filter((_, i) => i !== index);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
    setMessages(updatedMessages.filter(
      (msg) => msg.sender === currentUser || msg.receiver === currentUser
    ));
  };

  const handleReply = (msg) => {
    setCurrentMessage(msg);
  };

  return (
    <div className="inbox">
      <h2>Mesaj Kutusu</h2>
      <div className="messages-list">
        {messages.map((msg, index) => (
          <div key={index} className="message-item">
            <h3>{msg.petName}</h3>
            {msg.petImage && <img src={msg.petImage} alt={msg.petName} />}
            <p>{msg.message}</p>
            <span>{new Date(msg.timestamp).toLocaleString()}</span>
            <button onClick={() => handleReply(msg)}>Cevap Ver</button>
            <button onClick={() => handleDeleteMessage(index)}>Sil</button>
          </div>
        ))}
      </div>
      {currentMessage && (
        <div className="message-reply">
          <h3>Konu: {currentMessage.petName}</h3>
          <MessageComponent
            sender={currentUser}
            receiver={currentMessage.sender === currentUser ? currentMessage.receiver : currentMessage.sender}
            post={{ id: currentMessage.postId, petName: currentMessage.petName, petImage: currentMessage.petImage }}
          />
        </div>
      )}
    </div>
  );
}

export default Inbox;
