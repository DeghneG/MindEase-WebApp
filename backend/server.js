// Main backend entry point
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const chatRoutes = require('./api/routes/chatRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/chat', chatRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'MindEase API is running' });
});

app.listen(PORT, () => {
  console.log(`MindEase backend server running on port ${PORT}`);
});
