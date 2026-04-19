// Handles NLP API integration
const aiConfig = require('../config/ai-config');

const generateResponse = async (message, sentiment) => {
  // TODO: Integrate with AI API (e.g., OpenAI, Google Gemini)
  // This is a placeholder implementation

  const { stressLevel } = sentiment;

  let supportResponse = '';
  let options = [];

  switch (stressLevel) {
    case 'high':
      supportResponse =
        "I can sense you're going through a really tough time. Please remember that it's okay to ask for help. Consider reaching out to a counselor or a trusted person in your life.";
      options = ["I need crisis resources", "Just someone to talk to", "I feel overwhelmed"];
      break;
    case 'moderate':
      supportResponse =
        "It sounds like you're feeling some pressure. Let's try a quick breathing exercise: breathe in for 4 counts, hold for 4, and exhale for 4. Sometimes breaking tasks into smaller steps can also help.";
      options = ["Guide me through a breathing exercise", "Help me organize my tasks"];
      break;
    case 'low':
    default:
      supportResponse =
        "You're doing great! Remember to take breaks and celebrate small wins. Every step forward counts.";
      options = ["I have exams coming up", "Thanks for the encouragement", "I feel tired"];
      break;
  }

  return { reply: supportResponse, options };
};

module.exports = { generateResponse };
