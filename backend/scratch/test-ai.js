require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
  const key = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(key);
  
  const modelsToTest = [
    'gemini-2.5-flash',
    'gemini-flash-latest',
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
    'gemini-3.1-pro-preview',
    'nano-banana-pro-preview'
  ];

  for (const modelName of modelsToTest) {
    try {
      console.log(`Testing ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Hi");
      console.log(`✅ ${modelName} SUCCESS: ${result.response.text().substring(0, 50)}...`);
    } catch (e) {
      console.error(`❌ ${modelName} FAILED: ${e.message}`);
    }
  }
}

test();
