// Handles NLP API integration
const aiConfig = require('../config/ai-config');

const generateResponse = async (message, sentiment) => {
  // TODO: Integrate with AI API (e.g., OpenAI, Google Gemini)
  // This is a placeholder implementation

  const { stressLevel } = sentiment;

  let supportResponse = '';

  switch (stressLevel) {
    case 'high':
      supportResponse =
        "I can sense you're going through a really tough time. Please remember that it's okay to ask for help. Consider reaching out to a counselor or a trusted person in your life.";
      break;
    case 'moderate':
      supportResponse =
        "It sounds like you're feeling some pressure. Let's try a quick breathing exercise: breathe in for 4 counts, hold for 4, and exhale for 4. Sometimes breaking tasks into smaller steps can also help.";
      break;
    case 'low':
    default:
      supportResponse =
        "You're doing great! Remember to take breaks and celebrate small wins. Every step forward counts.";
      break;
  }

  return supportResponse;
};

module.exports = { generateResponse };
