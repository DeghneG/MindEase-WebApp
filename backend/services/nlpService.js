const { GoogleGenerativeAI } = require('@google/generative-ai');
const aiConfig = require('../config/ai-config');

const generateResponse = async (message, sentiment) => {
  const { stressLevel, intent } = sentiment;
  
  // Try using Gemini AI if API Key is valid
  if (aiConfig.apiKey && aiConfig.apiKey !== 'your_api_key_here') {
    try {
      const genAI = new GoogleGenerativeAI(aiConfig.apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `You are MindEase, an empathetic emotional support AI assistant for college students. 
The student just said: "${message}"
Their detected stress level is: ${stressLevel}.
Their detected topic intent is: ${intent}.

Think like an empathetic, highly versatile human counselor. Do not be repetitive.
If they talk about exams, ask them how they are studying or what subject is hardest.
If they say thanks, say you're always here.
If they say they are okay, say you are glad to hear it.

Provide a response formatted STRICTLY as JSON with no markdown wrapping. The JSON must have:
{
  "reply": "Your conversational response string",
  "options": ["A short suggested button reply the user might click next", "Another suggested button reply"]
}`;

      const result = await model.generateContent(prompt);
      let text = result.response.text();
      
      // Clean up markdown code block if generated
      if (text.startsWith('\`\`\`json')) {
         text = text.substring(7, text.length - 3);
      } else if (text.startsWith('\`\`\`')) {
         text = text.substring(3, text.length - 3);
      }
      
      const parsed = JSON.parse(text.trim());
      if (parsed && parsed.reply) {
         return { reply: parsed.reply, options: parsed.options || [] };
      }
    } catch (e) {
      console.error("Gemini API Error:", e);
      // Fallback below
    }
  }

  // --- ADVANCED MOCK FALLBACK --- //
  let supportResponse = '';
  let options = [];

  if (intent === 'exams') {
     supportResponse = "Exams can be incredibly overwhelming, but remember that a test score doesn't define your worth. What specifically is making you anxious? I can help you organize a study plan or just listen.";
     options = ["Help me break down my tasks", "I can't concentrate", "I'm just really stressed"];
  } else if (intent === 'gratitude') {
     supportResponse = "You're very welcome! I'm always here to listen and help out. Is there anything else on your mind today?";
     options = ["Yes, let's talk about something else", "No, I'm good for now"];
  } else if (intent === 'exhaustion') {
     supportResponse = "It sounds like your body is telling you to rest. Pushing through exhaustion usually does more harm than good. Can you take a short nap or step away from your work?";
     options = ["I can take a 20-min nap", "I have too much to do", "Maybe a quick walk"];
  } else if (intent === 'okay') {
     supportResponse = "I'm really glad to hear that you're doing okay! Getting to an 'okay' baseline is a great place to be. Make sure to keep taking care of yourself.";
     options = ["I will, thanks!", "Can you show me self-care tips?"];
  } else {
     // Default general mapping...
     if (stressLevel === 'high') {
       supportResponse = "I hear you, and it sounds incredibly heavy to carry alone. You don't have to figure it all out right now. Is there someone you trust that you could call?";
       options = ["I need crisis resources", "Just someone to talk to", "I feel overwhelmed"];
     } else if (stressLevel === 'moderate') {
       supportResponse = "It's valid to feel anxious about this. Remember that you have handled difficult things before. You can handle this too.";
       options = ["Guide me through a breathing exercise", "Help me organize my tasks"];
     } else {
       supportResponse = "You're doing great! Keep keeping on. If you ever need a little mental refresh, you know where to find me.";
       options = ["I have some exams coming up", "Thanks for the encouragement", "I feel tired"];
     }
  }

  return { reply: supportResponse, options };
};

module.exports = { generateResponse };
