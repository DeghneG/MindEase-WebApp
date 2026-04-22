require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  console.log("Testing history starting with MODEL...");
  try {
    const chat = model.startChat({
      history: [
        { role: 'model', parts: [{ text: 'Hello, how are you?' }] }
      ]
    });
    const result = await chat.sendMessage("I'm fine");
    console.log("✅ SUCCESS (surprisingly)");
  } catch (e) {
    console.error("❌ FAILED:", e.message);
  }

  console.log("\nTesting history starting with USER...");
  try {
    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: 'Hi' }] },
        { role: 'model', parts: [{ text: 'Hello!' }] }
      ]
    });
    const result = await chat.sendMessage("How are you?");
    console.log("✅ SUCCESS");
  } catch (e) {
    console.error("❌ FAILED:", e.message);
  }
}

test();
