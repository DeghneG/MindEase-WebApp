// Handles NLP API integration
const aiConfig = require('../config/ai-config');

const generateResponse = async (message, sentiment) => {
  // TODO: Integrate with AI API (e.g., OpenAI, Google Gemini)
  // This is a placeholder implementation

  const { stressLevel } = sentiment;

  let supportResponse = '';
  let options = [];

  const highStressResponses = [
    "I can sense you're going through a really tough time. Please remember that it's okay to ask for help. Consider reaching out to a counselor or a trusted person in your life.",
    "This sounds incredibly heavy to carry alone. You don't have to figure it all out right now. Is there someone you trust that you could call?",
    "I'm so sorry you're feeling this way. It completely makes sense that you'd feel overwhelmed. Just take it one moment at a time, okay?",
    "When things feel this intense, the most important thing is your safety and well-being. Would you like me to connect you with professional support?"
  ];

  const highStressOptionsList = [
    ["I need crisis resources", "Just someone to talk to", "I feel overwhelmed"],
    ["Can you guide me through this?", "I need professional help", "I'm just so tired"],
    ["Help me ground myself", "Who can I call?", "I don't know what to do"]
  ];

  const moderateStressResponses = [
    "It sounds like you're feeling some pressure. Let's try a quick breathing exercise: breathe in for 4 counts, hold for 4, and exhale for 4.",
    "I hear you. That sounds stressful. Sometimes when we have too much on our plate, writing it all down step-by-step is the easiest way to regain control.",
    "That sounds frustrating! Try stepping away for just 5 minutes—a quick walk or change of scenery does wonders for the brain.",
    "It's valid to feel anxious about this. Remember that you have handled difficult things before. You can handle this too."
  ];

  const moderateStressOptionsList = [
    ["Guide me through a breathing exercise", "Help me organize my tasks"],
    ["I need a quick break", "Let's break down my tasks", "I'm worried about failing"],
    ["Can I see a coping strategy?", "Just dealing with nerves"]
  ];

  const lowStressResponses = [
    "You're doing great! Remember to take breaks and celebrate small wins. Every step forward counts.",
    "It sounds like you're managing things pretty well, but it's always good to check in with yourself. How are you feeling overall?",
    "I love that! Keep keeping on. If you ever need a little mental refresh, you know where to find me.",
    "Awesome. Make sure you're still staying hydrated and getting enough sleep. You've got this!"
  ];

  const lowStressOptionsList = [
    ["I have exams coming up", "Thanks for the encouragement", "I feel tired"],
    ["Just passing by", "Can we chat about my day?", "I feel okay"],
    ["Show me some self-care tips", "Thanks!"]
  ];

  switch (stressLevel) {
    case 'high':
      const hIdx = Math.floor(Math.random() * highStressResponses.length);
      supportResponse = highStressResponses[hIdx];
      options = highStressOptionsList[hIdx % highStressOptionsList.length];
      break;
    case 'moderate':
      const mIdx = Math.floor(Math.random() * moderateStressResponses.length);
      supportResponse = moderateStressResponses[mIdx];
      options = moderateStressOptionsList[mIdx % moderateStressOptionsList.length];
      break;
    case 'low':
    default:
      const lIdx = Math.floor(Math.random() * lowStressResponses.length);
      supportResponse = lowStressResponses[lIdx];
      options = lowStressOptionsList[lIdx % lowStressOptionsList.length];
      break;
  }

  return { reply: supportResponse, options };
};

module.exports = { generateResponse };
