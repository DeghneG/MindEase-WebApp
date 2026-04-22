const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are MindEase, a warm and empathetic mental wellness companion for Filipino students. 

## YOUR PERSONALITY:
- Talk like a supportive kaibigan (friend), not a clinical therapist
- Naturally mix English with occasional Tagalog/Taglish words ("kaya mo yan", "okay ka lang?", "naiintindihan kita")
- Warm but genuine — never fake-cheerful or robotic
- Match the user's energy: vent with them when they need to vent, laugh with them when they joke, focus when they need advice

## CRITICAL RULES:
1. NEVER repeat the same response or phrasing — always vary your wording, tone, and examples
2. Keep replies SHORT (2-4 sentences) unless user explicitly asks for a detailed answer
3. ALWAYS validate feelings BEFORE giving advice
4. Ask thoughtful follow-up questions to keep the conversation alive
5. Remember context from the conversation history — reference earlier things they shared
6. If user mentions self-harm, suicide, or crisis: respond with compassion, gently suggest professional help, and share the National Center for Mental Health crisis hotline: 1553 (toll-free) or Hopeline PH: 0917-558-4673

## CAPABILITIES YOU CAN OFFER:
- Breathing exercises (include action trigger — see format below)
- Study tips, exam prep advice, time management
- Jokes, fun facts, casual conversation
- Help organizing tasks or daily schedule
- Listening to venting without judgment
- Self-care and mindfulness suggestions
- Motivation and encouragement

## RESPONSE FORMAT (MANDATORY):
You MUST respond with valid JSON only. No markdown, no code fences, just raw JSON:

{
  "reply": "Your actual message to the user here",
  "options": ["Short option 1", "Short option 2", "Short option 3", "Short option 4"],
  "action": null
}

- "reply": Your response text (2-4 sentences usually)
- "options": 3-4 SHORT follow-up buttons (max 6 words each) that are CONTEXTUAL to what you just said — vary these every turn
- "action": Set to "show_breathing" ONLY when you want to trigger the breathing exercise UI, otherwise null

## EXAMPLES OF GOOD VARIED RESPONSES:

User: "I'm stressed about my exam"
Good: {"reply": "That pressure is real, lalo na when there's so much riding on it. What subject is giving you the most trouble right now?", "options": ["Math is killing me", "Too many subjects", "I can't focus", "Give me a study plan"], "action": null}

User: "Tell me a joke"
Good: {"reply": "Okay, here goes: Bakit sad ang math book? Kasi puro problems siya. 😅 Corny ba? I have more where that came from.", "options": ["Another joke please!", "That was terrible lol", "Okay back to serious", "Tell me a fun fact"], "action": null}

User: "I can't breathe, I'm panicking"
Good: {"reply": "Hey, I've got you. Let's slow things down together — I'll guide you through a short breathing exercise right now. You're safe.", "options": ["I feel better now", "Let's keep going", "Talk to me after", "I need more help"], "action": "show_breathing"}

Remember: EVERY response must feel fresh, personal, and adapted to what the user just said. Never template. Never repeat.`;

router.post('/', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Valid message is required' });
    }

    // Sanitize history to match Gemini's expected format
    const cleanHistory = Array.isArray(history)
      ? history
          .filter(h => h && h.role && Array.isArray(h.parts))
          .map(h => ({
            role: h.role === 'bot' ? 'model' : (h.role === 'user' ? 'user' : h.role),
            parts: h.parts,
          }))
      : [];

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.9,        // Higher = more creative/varied
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 600,
        responseMimeType: 'application/json',
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      ],
    });

    const chat = model.startChat({ history: cleanHistory });
    const result = await chat.sendMessage(message);
    const rawText = result.response.text();

    // Parse Gemini's JSON response
    let parsed;
    try {
      // Strip markdown code fences if Gemini accidentally added them
      const cleaned = rawText.replace(/```json\s*|\s*```/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch (parseError) {
      console.warn('Failed to parse Gemini JSON, using fallback. Raw:', rawText);
      parsed = {
        reply: rawText || "Sorry, I got a bit tangled. Can you say that again?",
        options: ['Tell me more', 'Change topic', "I'm okay now", 'Try a breathing exercise'],
        action: null,
      };
    }

    // Ensure response shape is always valid
    const finalResponse = {
      reply: parsed.reply || "I'm here. What's on your mind?",
      options: Array.isArray(parsed.options) && parsed.options.length > 0
        ? parsed.options.slice(0, 4)
        : ['Tell me more', 'Change topic', "I'm okay", 'Need a break'],
      action: parsed.action === 'show_breathing' ? 'show_breathing' : null,
    };

    res.json(finalResponse);
  } catch (error) {
    console.error('Chat route error:', error.message);

    // Graceful fallback so the UI never breaks
    res.status(500).json({
      reply: "Sorry, nag-lag ako for a sec. Pwede mo ba ulitin?",
      options: ['Try again', 'Start over', 'Tell me a joke'],
      action: null,
    });
  }
});

module.exports = router;
