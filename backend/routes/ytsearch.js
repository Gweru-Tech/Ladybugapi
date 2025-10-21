const express = require('express');
const router = express.Router();
const YoutubeSearch = require('youtube-search-api');

router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        error: 'Missing query parameter',
        message: 'Please provide a search query using ?q=your_search'
      });
    }

    const results = await YoutubeSearch.GetListByKeyword(q, false, 10);
    
    const formattedResults = results.items.map(item => ({
      id: item.id,
      title: item.title,
      thumbnail: item.thumbnail.thumbnails[0].url,
      channelTitle: item.channelTitle,
      publishedAt: item.publishedAt,
      duration: item.length?.simpleText || 'N/A',
      views: item.viewCount?.text || 'N/A',
      url: `https://www.youtube.com/watch?v=${item.id}`
    }));

    res.json({
      success: true,
      query: q,
      results: formattedResults
    });
  } catch (error) {
    res.status(500).json({
      error: 'Search failed',
      message: error.message
    });
  }
});

module.exports = router;
