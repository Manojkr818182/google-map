import React, { useState } from 'react';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hello! How are you today?', sender: 'sender', timestamp: '10:00 AM' },
    { text: 'I’m good, thank you! How about you?', sender: 'receiver', timestamp: '10:01 AM' },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        text: message,
        sender: 'sender',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="chat">
    <div className="chat-container">
        <div >
            <h3>Chat box</h3>
        </div>
      {messages.map((msg, index) => (
        <div key={index} className={`chat-message ${msg.sender}`}>
          <div className="message-content">
            <p>{msg.text}</p>
            <span className="timestamp">{msg.timestamp}</span>
          </div>
        </div>
      ))}
      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()} // Send message on Enter key press
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
    </div>
  );
};

export default Chat;
