import React, { useState } from 'react';
import axios from 'axios';

function ChatGPT({ apiUrl }) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { role: 'user', content: message };
    setChat(prev => [...prev, userMessage]);
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/chatgpt`, { message });
      const botMessage = { role: 'bot', content: response.data.reply };
      setChat(prev => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = { role: 'bot', content: 'Sorry, something went wrong.' };
      setChat(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="api-section">
      <h2>💬 ChatGPT</h2>
      <p className="description">Chat with AI assistant</p>

      <div className="chat-container">
        <div className="chat-messages">
          {chat.length === 0 && (
            <div className="empty-state">
              <p>👋 Start a conversation!</p>
            </div>
          )}
          {chat.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <div className="message-content">{msg.content}</div>
            </div>
          ))}
          {loading && (
            <div className="message bot">
              <div className="message-content typing">Typing...</div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="chat-input-form">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="input"
            disabled={loading}
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatGPT;
