const messageRepository = require('../repositories/message.repository');
const conversationRepository = require('../repositories/conversation.repository');

async function createMessage(req, res) {
  try {
    const { conversation_id } = req.params;

    const {
      direction,
      sender_type,
      content,
      message_type,
    } = req.body;

    if (!direction || !sender_type || !content) {
      return res.status(400).json({
        error: 'direction, sender_type and content are required',
      });
    }

    const conversation = await conversationRepository.findConversationById(conversation_id);

    if (!conversation) {
      return res.status(404).json({
        error: 'Conversation not found',
      });
    }

    const message = await messageRepository.createMessage({
      conversation_id,
      direction,
      sender_type,
      content,
      message_type,
    });

    return res.status(201).json(message);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

async function listMessages(req, res) {
  try {
    const { conversation_id } = req.params;

    const messages = await messageRepository.findMessagesByConversationId(conversation_id);

    return res.json({
      messages,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

module.exports = {
  createMessage,
  listMessages,
};