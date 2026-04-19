const { GoogleGenerativeAI } = require('@google/generative-ai');
const aiConfig = require('../config/ai-config');

const generateResponse = async (message, sentiment) => {
  const { stressLevel, intent } = sentiment;
  const apiKey = aiConfig.apiKey;
  
  // Try using Gemini AI if API Key is valid
  if (apiKey && apiKey !== 'your_api_key_here') {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `You are MindEase, a deeply empathetic human-sounding student wellness assistant.
The student just said: "${message}"
Intent: ${intent}
Stress: ${stressLevel}

YOUR GOAL: Respond like a helpful, unique human. 
1. Answer specifically to EXACTLY what they said. 
2. If they mention productivity or organizing, offer specific steps or encouragement.
3. If they ask for a joke, tell a funny, fresh one.
4. ALWAYS provide 3 quick-reply options that are laser-focused on the conversation context. NEVER show generic options like "I feel sad" if the user is currently talking about a joke or a specific exam.

Return JSON ONLY:
{
  "reply": "Your conversational answer string",
  "options": ["Hyper-contextual choice 1", "Hyper-contextual choice 2", "Hyper-contextual choice 3"]
}`;

      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();
      
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
    "I told my doctor I broke my arm in two places. He told me to stop going to those places. 🩺",
    "What do you call a bear with no teeth? A gummy bear! 🧸",
    "Why did the scarecrow win an award? Because he was outstanding in his field! 🌾",
    "What kind of shoes do ninjas wear? Sneakers! 🥷",
    "Why did the bicycle fall over? Because it was two-tired! 🚲",
    "How does a penguin build its house? Igloos it together! 🐧",
    "What do you call a sleeping dinosaur? A dino-snore! 💤",
    "Why don't skeletons fight each other? They don't have the guts! 💀"
  ];

  switch (intent) {
    case 'joke':
      supportResponse = jokeList[Math.floor(Math.random() * jokeList.length)];
      options = ["Tell me another one! 😆", "That was funny", "Let's talk about my day"];
      break;
    case 'productivity':
      supportResponse = "Organizing can feel like a mountain, but we can climb it one step at a time. I'd suggest starting by writing down the 3 smallest tasks you can do right now. Want to try that?";
      options = ["Yes, let's list 3", "I'm too overwhelmed", "Maybe a quick walk first"];
      break;
    case 'sadness':
      supportResponse = "I'm so sorry things are feeling heavy right now. It's okay to not be okay. I'm right here with you. Do you want to talk about why you're feeling low?";
      options = ["Everything is hard", "I'm just lonely", "Show me a coping tool"];
      break;
    case 'exams':
      supportResponse = "Exams are a lot of pressure! Remember that you are more than your grades. How can I help? We could break down a subject or try a breathing tool.";
      options = ["Help me break it down", "I can't focus", "Try breathing guide"];
      break;
    case 'exhaustion':
      supportResponse = "You sound really drained. Pushing through exhaustion usually makes it harder. Can you promise me you'll take a 15 minute 'no screen' break?";
      options = ["Okay, I'll try", "I have too much work", "Log a 5-min walk"];
      break;
    case 'gratitude':
      supportResponse = "You're so welcome! It's a privilege to support you. Anything else bothering you, or are we just hanging out?";
      options = ["Let's chat more", "I have some exams", "I'm good, thanks!"];
      break;
    case 'okay':
      supportResponse = "I love hearing that you're feeling steady. It's great to celebrate the 'okay' days too. Anything you want to do to maintain this good energy?";
      options = ["Show me self-care tips", "What can I do next?", "I'm just relaxing"];
      break;
    default:
      if (stressLevel === 'high') {
        supportResponse = "I can tell you're carrying a lot. Please remember that you don't have to carry it all alone. I'm here, and there are people who care deeply about your safety.";
        options = ["I need crisis help", "Just stay with me", "Grounding exercise"];
      } else if (stressLevel === 'moderate') {
        supportResponse = "Things seem a bit intense. Let's try to lower the volume of all that noise. Would a quick breathing session or a task list help you more?";
        options = ["Breathing session", "Organize my tasks", "Just listen to me"];
      } else {
        supportResponse = "I'm here for you! No matter what's on your mind, we can talk through it. How are you feeling about the rest of your week?";
        options = ["It's busy", "A bit nervous", "Feeling okay!"];
      }
  }

  return { reply: supportResponse, options };
};

module.exports = { generateResponse };
