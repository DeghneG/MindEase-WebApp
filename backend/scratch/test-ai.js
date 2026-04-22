require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
  const key = process.env.GEMINI_API_KEY;
  
  try {
    const genAI = new GoogleGenerativeAI(key);
    console.log("Trying gemini-2.5-flash...");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent("Hello! Can you hear me?");
    console.log("Success (gemini-2.5-flash):", result.response.text());
  } catch (e) {
    console.error("Failed (gemini-2.5-flash):", e.message);
  }
}

test();
