const express = require('express');
const router = express.Router();

const { general_chatbot, quiz_generate } = require('../controllers/gptController')
const { getMessage, addMessage, deleteMessages } = require('../controllers/chatbotController');


// Chatbot and quiz routes
router.post('/chatbot', general_chatbot);
router.post('/quiz', quiz_generate);

// User authentication and message handling routes
router.get('/chat/:userId', getMessage);
router.delete('/chat/:userId', deleteMessages);
router.patch('/chat/:userId', addMessage);

module.exports = router;