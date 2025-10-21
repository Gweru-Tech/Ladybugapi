const express = require('express');
const router = express.Router();
const axios = require('axios');

// Simple chatbot responses (replace with actual OpenAI API if you have a key)
const responses = {
  hello: "Hello! How can I help you today?",
  hi: "Hi there! What can I do for you?",
  how: "I'm doing great! Thanks for asking.",
  bye: "Goodbye! Have a great day!",
  default: "I'm a simple chatbot. Try asking me something!"
};

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({
        error: 'Missing message',
        message: 'Please provide a message in the request body'
      });
    }

    // If you have OpenAI API key, uncomment and use this:
    /*
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    const reply = openaiResponse.data.choices[0].message.content;
    */

    // Simple response logic
    const lowerMessage = message.toLowerCase();
    let reply = responses.default;
    
    for (const [key, value] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        reply = value;
        break;
      }
    }

    res.json({
      success: true,
      message: message,
      reply: reply,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Chat failed',
      message: error.message
    });
  }
});

module.exports = router;
