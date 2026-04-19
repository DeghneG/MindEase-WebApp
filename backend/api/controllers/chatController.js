// Logic for handling request/response
const nlpService = require('../../services/nlpService');
const sentimentAnalysis = require('../../services/sentimentAnalysis');

const handleMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Analyze sentiment of the user's message
    const sentiment = await sentimentAnalysis.analyze(message);

    // Generate AI response based on message and sentiment
    const response = await nlpService.generateResponse(message, sentiment);

    res.json({
      reply: response,
      sentiment: sentiment,
    });
  } catch (error) {
    console.error('Error handling message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { handleMessage };
