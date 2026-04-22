// Main backend entry point
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const chatRoutes = require('./api/routes/chatRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow all origins — works on Vercel and locally
  credentials: false,
}));
app.use(express.json({ limit: '1mb' }));

// Request logger (helpful for debugging during capstone demo)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/chat', chatRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'MindEase API is running', 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`✓ MindEase backend running on http://localhost:${PORT}`);
});
