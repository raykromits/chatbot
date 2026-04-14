const conversationRepository = require('../repositories/conversation.repository');

async function createConversation(req, res) {
  try {
    const { customerName, customerPhone, channel, assignedAgent } = req.body;

    if (!customerPhone) {
      return res.status(400).json({
        error: 'customerPhone is required',
      });
    }

    const conversation = await conversationRepository.createConversation({
      customerName,
      customerPhone,
      channel,
      assignedAgent,
    });

    return res.status(201).json(conversation);
  } catch (error) {
    console.error('Create conversation error:', error);

    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

async function getConversationById(req, res) {
  try {
    const { id } = req.params;

    const conversation = await conversationRepository.findConversationById(id);

    if (!conversation) {
      return res.status(404).json({
        error: 'Conversation not found',
      });
    }

    return res.status(200).json(conversation);
  } catch (error) {
    console.error('Get conversation error:', error);

    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

async function updateConversationState(req, res) {
  try {
    const { id } = req.params;
    const { currentState } = req.body;

    if (!currentState) {
      return res.status(400).json({
        error: 'currentState is required',
      });
    }

    const updatedConversation =
      await conversationRepository.updateConversationState(id, currentState);

    if (!updatedConversation) {
      return res.status(404).json({
        error: 'Conversation not found',
      });
    }

    return res.status(200).json(updatedConversation);
  } catch (error) {
    console.error('Update conversation state error:', error);

    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

async function closeConversation(req, res) {
  try {
    const { id } = req.params;

    const closedConversation = await conversationRepository.closeConversation(id);

    if (!closedConversation) {
      return res.status(404).json({
        error: 'Conversation not found',
      });
    }

    return res.status(200).json(closedConversation);
  } catch (error) {
    console.error('Close conversation error:', error);

    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

module.exports = {
  createConversation,
  getConversationById,
  updateConversationState,
  closeConversation,
};