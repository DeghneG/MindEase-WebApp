// Logic for handling request/response
const nlpService = require('../../services/nlpService');
const sentimentAnalysis = require('../../services/sentimentAnalysis');

const handleMessage = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Analyze sentiment of the user's message
    const sentiment = await sentimentAnalysis.analyze(message);

    // Generate AI response based on message, sentiment, and history
    const { reply, options, action } = await nlpService.generateResponse(message, sentiment, history || []);

    res.json({
      reply,
      options,
      action,
      sentiment: sentiment,
    });
  } catch (error) {
    console.error('Error handling message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { handleMessage };
