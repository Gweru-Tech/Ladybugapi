const express = require('express');
const router = express.Router();
const ytdl = require('ytdl-core');

router.get('/', async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({
        error: 'Missing URL parameter',
        message: 'Please provide a YouTube URL using ?url=youtube_url'
      });
    }

    if (!ytdl.validateURL(url)) {
      return res.status(400).json({
        error: 'Invalid URL',
        message: 'Please provide a valid YouTube URL'
      });
    }

    const info = await ytdl.getInfo(url);
    const videoFormats = ytdl.filterFormats(info.formats, 'videoandaudio');
    
    const qualities = videoFormats.map(format => ({
      quality: format.qualityLabel,
      resolution: format.height + 'p',
      fps: format.fps,
      downloadUrl: format.url,
      mimeType: format.mimeType,
      filesize: format.contentLength
    }));

    res.json({
      success: true,
      title: info.videoDetails.title,
      author: info.videoDetails.author.name,
      duration: info.videoDetails.lengthSeconds,
      thumbnail: info.videoDetails.thumbnails[0].url,
      videos: qualities
    });
  } catch (error) {
    res.status(500).json({
      error: 'MP4 conversion failed',
      message: error.message
    });
  }
});

module.exports = router;
