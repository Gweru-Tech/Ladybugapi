import React, { useState } from 'react';
import axios from 'axios';

function YTSearch({ apiUrl }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await axios.get(`${apiUrl}/ytsearch?q=${encodeURIComponent(query)}`);
      setResults(response.data.results);
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="api-section">
      <h2>🔍 YouTube Search</h2>
      <p className="description">Search for YouTube videos</p>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search query..."
          className="input"
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      <div className="results-grid">
        {results.map((video) => (
          <div key={video.id} className="video-card">
            <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
            <div className="video-info">
              <h3 className="video-title">{video.title}</h3>
              <p className="video-channel">{video.channelTitle}</p>
              <div className="video-meta">
                <span>⏱️ {video.duration}</span>
                <span>👁️ {video.views}</span>
              </div>
              <a href={video.url} target="_blank" rel="noopener noreferrer" className="btn btn-small">
                Watch on YouTube
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YTSearch;
