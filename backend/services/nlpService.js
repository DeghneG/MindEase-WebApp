const { GoogleGenerativeAI } = require('@google/generative-ai');
const aiConfig = require('../config/ai-config');

const generateResponse = async (message, sentiment) => {
  const { stressLevel, intent } = sentiment;
  
  // Try using Gemini AI if API Key is valid
  if (aiConfig.apiKey && aiConfig.apiKey !== 'your_api_key_here') {
    try {
      const genAI = new GoogleGenerativeAI(aiConfig.apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `You are MindEase, a deeply empathetic and human-sounding emotional support AI for college students.
The student just said: "${message}"
Detected Stress: ${stressLevel}
Detected Intent: ${intent}

Your goal is to provide a uniquely supportive, non-repetitive response. 
- If they are sad or lonely, be very gentle and offer to listen more.
- If they mention exams, ask specifically which subject or how they are feeling about it.
- Always include 2-3 dynamic button options that lead to more conversation or coping strategies.

CRITICAL: Return ONLY a valid JSON object. No markdown. No conversational filler around the JSON.
{
  "reply": "Your human-sounding empathetic response",
  "options": ["First button text", "Second button text"]
}`;

      const result = await model.generateContent(prompt);
      let text = result.response.text();
      
      // Robust JSON extraction using Regex to find the first '{' and last '}'
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0].trim());
        if (parsed && parsed.reply) {
          return { reply: parsed.reply, options: parsed.options || [] };
        }
      }
    } catch (e) {
      console.error("Gemini API Error:", e);
      // Fallback below
    }
  }

  // --- RELEVANT HUMAN FALLBACK LOGIC --- //
  let supportResponse = '';
  let options = [];

  switch (intent) {
    case 'sadness':
      supportResponse = "I'm so sorry to hear you're feeling this way. It's completely valid to feel sad right now. Just know that I'm here to listen. Would you like to tell me more about what's making you feel this way?";
      options = ["I just feel low", "Everything feels heavy", "Can we try a breathing exercise?"];
      break;
    case 'lonely':
      supportResponse = "Feeling lonely can be really tough, especially in a busy environment. Please know that you're not alone in feeling this way. Is there someone you've thought about reaching out to, or would you like to just chat here?";
      options = ["I feel disconnected", "It's hard to make friends", "Let's keep chatting"];
      break;
    case 'exams':
      supportResponse = "Exams can be such a huge source of pressure. Remember that your worth isn't tied to a score. How is the studying going? Is there a specific subject that's causing the most stress?";
      options = ["It's my major subject", "I feel behind", "Help me stay focused"];
      break;
    case 'gratitude':
      supportResponse = "You are so welcome! I'm really glad I could be here for you. Is there anything else you'd like to dive into today?";
      options = ["Let's talk more", "I'm good for now, thanks"];
      break;
    case 'exhaustion':
      supportResponse = "It sounds like you're running on empty. Pushing through exhaustion is really hard. Can you find just 15 minutes to close your eyes or step away from your screens?";
      options = ["I'll try that", "I can't stop yet", "I'm just so drained"];
      break;
    case 'okay':
      supportResponse = "I'm really heartened to hear you're doing okay. It shows a lot of resilience. Keep taking those small steps for yourself!";
      options = ["Thanks!", "What else can I do?", "Tell me a joke"];
      break;
    default:
      if (stressLevel === 'high') {
        supportResponse = "I can tell you're carrying a lot right now. Please remember it's okay to reach out for professional help too. I'm here to support you in the meantime.";
        options = ["Show me crisis resources", "Just someone to talk to", "Help me ground myself"];
      } else if (stressLevel === 'moderate') {
        supportResponse = "It sounds like you're dealing with some heavy pressure. Let's take it one step at a time. Do you want to try a quick grounding activity?";
        options = ["Yes, guide me", "Maybe later", "Help me organize my day"];
      } else {
        supportResponse = "I'm here for you! No matter what's on your mind, we can talk through it. How has the rest of your day been?";
        options = ["It's been okay", "A bit stressful", "I have a lot on my mind"];
      }
  }

  return { reply: supportResponse, options };
};

module.exports = { generateResponse };
