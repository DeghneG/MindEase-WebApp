const { GoogleGenerativeAI } = require('@google/generative-ai');
const aiConfig = require('../config/ai-config');

const generateResponse = async (message, sentiment) => {
  const { stressLevel, intent } = sentiment;
  const apiKey = aiConfig.apiKey;
  
  // Try using Gemini AI if API Key is valid
  if (apiKey && apiKey !== 'your_api_key_here') {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      // Explicitly using a slightly older but stable model name string just in case
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `You are MindEase, a deeply empathetic human-sounding student wellness assistant.
The student just said: "${message}"
Intent: ${intent}
Stress: ${stressLevel}

Respond like a helpful human. If they want a joke, tell a funny one. If they are sad, listen. 
Answer specifically to what they said.

Return JSON ONLY:
{
  "reply": "Your conversational answer string",
  "options": ["Suggestion 1", "Suggestion 2"]
}`;

      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();
      
      // Better JSON cleaning
      const start = responseText.indexOf('{');
      const end = responseText.lastIndexOf('}');
      if (start !== -1 && end !== -1) {
        const jsonStr = responseText.substring(start, end + 1);
        const parsed = JSON.parse(jsonStr);
        if (parsed && parsed.reply) {
          return { reply: parsed.reply, options: parsed.options || [] };
        }
      }
    } catch (e) {
      console.error("AI Error:", e.message);
    }
  }

  // --- LAST RESORT FALLBACKS (If AI is down) --- //
  let supportResponse = '';
  let options = [];

  const jokeList = [
    "Why don't scientists trust atoms? Because they make up everything! 😂",
    "What do you call a fake noodle? An impasta! 🍝",
    "Why did the student eat his homework? Because the teacher told him it was a piece of cake! 🍰",
    "I told my doctor I broke my arm in two places. He told me to stop going to those places. 🩺"
  ];

  switch (intent) {
    case 'joke':
      supportResponse = jokeList[Math.floor(Math.random() * jokeList.length)];
      options = ["Tell me another!", "That was silly", "Let's talk about exams"];
      break;
    case 'sadness':
      supportResponse = "I'm so sorry to hear you're feeling down. I'm here to listen. Can you tell me what's specifically on your mind?";
      options = ["I just feel low", "I'm lonely", "Try a breathing exercise"];
      break;
    case 'exams':
      supportResponse = "Exams are tough! What subject is giving you the most trouble? I can help you break it down into small tasks.";
      options = ["I'm behind on studying", "I can't focus", "Help me organize"];
      break;
    case 'exhaustion':
      supportResponse = "It sounds like you need some serious rest. Have you been able to sleep at all lately?";
      options = ["Not really", "I'm just drained", "Let's try 5 min walk"];
      break;
    default:
      supportResponse = "I hear you. I'm here to support you through whatever you're feeling. How can I help make things a bit easier for you right now?";
      options = ["I have exams", "I feel sad", "Tell me a joke"];
  }

  return { reply: supportResponse, options };
};

module.exports = { generateResponse };
