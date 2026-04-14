const express = require('express');
const conversationController = require('../controllers/conversation.controller');

const router = express.Router();

router.post('/conversations', conversationController.createConversation);
router.get('/conversations/:id', conversationController.getConversationById);
router.patch('/conversations/:id/state', conversationController.updateConversationState);
router.patch('/conversations/:id/close', conversationController.closeConversation);

module.exports = router;