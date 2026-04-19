// Endpoint for receiving messages
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// POST /api/chat - Send a message and receive AI response
router.post('/', chatController.handleMessage);

module.exports = router;
