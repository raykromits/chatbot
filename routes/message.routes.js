const express = require('express');
const messageController = require('../controllers/message.controller');

const router = express.Router();

router.post('/conversations/:conversationId/messages', messageController.createMessage);
router.get('/conversations/:conversationId/messages', messageController.listMessagesByConversationId);

module.exports = router;