require('dotenv').config();
const https = require('https');

const key = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const models = JSON.parse(data).models;
    console.log("Available Model Names:");
    models.forEach(m => console.log(m.name));
  });
}).on('error', (err) => {
  console.log("Error:", err.message);
});
