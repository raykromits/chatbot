const express = require('express');
const controller = require('../controllers/message.controller');

const router = express.Router();

router.post('/conversations/:conversation_id/messages', controller.createMessage);
router.get('/conversations/:conversation_id/messages', controller.listMessages);

module.exports = router;