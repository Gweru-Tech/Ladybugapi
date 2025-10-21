import React, { useState } from 'react';
import axios from 'axios';

function YTMP3({ apiUrl }) {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConvert = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.get(`${apiUrl}/ytmp3?url=${encodeURIComponent(url)}`);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Conversion failed. Please check the URL.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="api-section">
      <h2>🎵 YouTube to MP3</h2>
      <p className="description">Convert YouTube videos to MP3 audio</p>

      <form onSubmit={handleConvert} className="search-form">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube URL here..."
          className="input"
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Converting...' : 'Convert'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {result && (
        <div className="result-card">
          <img src={result.thumbnail} alt={result.title} className="result-thumbnail" />
          <div className="result-info">
            <h3>{result.title}</h3>
            <p className="result-author">👤 {result.author}</p>
            <p className="result-duration">⏱️ {result.duration} seconds</p>
            
            <div className="audio-info">
              <h4>Audio Details:</h4>
              <p>Quality: {result.audio.quality}</p>
              <p>Bitrate: {result.audio.bitrate} kbps</p>
              <p>Format: {result.audio.mimeType}</p>
            </div>

            <a 
              href={result.audio.downloadUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-success"
              download
            >
              📥 Download MP3
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default YTMP3;
