import React, { useState } from 'react';
import YTSearch from './components/YTSearch';
import ChatGPT from './components/ChatGPT';
import YTMP3 from './components/YTMP3';
import YTMP4 from './components/YTMP4';
import Weather from './components/Weather';

function App() {
  const [activeTab, setActiveTab] = useState('ytsearch');

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

  const tabs = [
    { id: 'ytsearch', name: 'YouTube Search', icon: '🔍' },
    { id: 'chatgpt', name: 'ChatGPT', icon: '💬' },
    { id: 'ytmp3', name: 'YT to MP3', icon: '🎵' },
    { id: 'ytmp4', name: 'YT to MP4', icon: '🎬' },
    { id: 'weather', name: 'Weather', icon: '🌤️' }
  ];

  const renderComponent = () => {
    switch (activeTab) {
      case 'ytsearch':
        return <YTSearch apiUrl={API_BASE_URL} />;
      case 'chatgpt':
        return <ChatGPT apiUrl={API_BASE_URL} />;
      case 'ytmp3':
        return <YTMP3 apiUrl={API_BASE_URL} />;
      case 'ytmp4':
        return <YTMP4 apiUrl={API_BASE_URL} />;
      case 'weather':
        return <Weather apiUrl={API_BASE_URL} />;
      default:
        return <YTSearch apiUrl={API_BASE_URL} />;
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🚀 Ntando Mods API</h1>
        <p>Powerful APIs for your projects</p>
      </header>

      <nav className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-name">{tab.name}</span>
          </button>
        ))}
      </nav>

      <main className="content">
        {renderComponent()}
      </main>

      <footer className="footer">
        <p>© 2024 Ntando Mods API | Built with ❤️</p>
      </footer>
    </div>
  );
}

export default App;
