const express = require('express');
const controller = require('../controllers/conversation.controller');

const router = express.Router();

router.post('/conversations', controller.createConversation);
router.get('/conversations/:id', controller.getConversationById);
router.patch('/conversations/:id/state', controller.updateConversationState);
router.patch('/conversations/:id/close', controller.closeConversation);

module.exports = router;