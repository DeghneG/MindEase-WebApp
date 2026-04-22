// Configuration for AI APIs

const aiConfig = {
  apiKey: process.env.AI_API_KEY || 'AIzaSyBAj9ECKuo4T25jA8B39SjpVTD2dajmlfo',
  apiUrl: process.env.AI_API_URL,
  model: 'default',
  maxTokens: 500,
  temperature: 0.7,
};

module.exports = aiConfig;
