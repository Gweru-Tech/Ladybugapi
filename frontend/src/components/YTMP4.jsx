import React, { useState } from 'react';
import axios from 'axios';

function YTMP4({ apiUrl }) {
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
      const response = await axios.get(`${apiUrl}/ytmp4?url=${encodeURIComponent(url)}`);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Conversion failed. Please check the URL.');
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    const mb = bytes / (1024 * 1024);
    return mb.toFixed(2) + ' MB';
  };

  return (
    <div className="api-section">
      <h2>🎬 YouTube to MP4</h2>
      <p className="description">Download YouTube videos in various qualities</p>

      <form onSubmit={handleConvert} className="search-form">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube URL here..."
          className="input"
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Processing...' : 'Get Video'}
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
            
            <div className="video-qualities">
              <h4>Available Qualities:</h4>
              {result.videos.map((video, index) => (
                <div key={index} className="quality-option">
                  <div className="quality-info">
                    <span className="quality-badge">{video.quality}</span>
                    <span>FPS: {video.fps}</span>
                    <span>Size: {formatFileSize(video.filesize)}</span>
                  </div>
                  <a 
                    href={video.downloadUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-small btn-success"
                    download
                  >
                    📥 Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default YTMP4;
