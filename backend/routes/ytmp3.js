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
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    
    const bestAudio = audioFormats.reduce((best, format) => {
      return format.audioBitrate > (best.audioBitrate || 0) ? format : best;
    }, {});

    res.json({
      success: true,
      title: info.videoDetails.title,
      author: info.videoDetails.author.name,
      duration: info.videoDetails.lengthSeconds,
      thumbnail: info.videoDetails.thumbnails[0].url,
      audio: {
        quality: bestAudio.qualityLabel || 'audio',
        bitrate: bestAudio.audioBitrate,
        downloadUrl: bestAudio.url,
        mimeType: bestAudio.mimeType
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'MP3 conversion failed',
      message: error.message
    });
  }
});

module.exports = router;
