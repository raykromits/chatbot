const conversationRepository = require('../repositories/conversation.repository');

async function createConversation(req, res) {
  try {
    const {
      customer_name,
      customer_phone,
      channel,
      assigned_agent,
    } = req.body;

    if (!customer_phone) {
      return res.status(400).json({
        error: 'customer_phone is required',
      });
    }

    const conversation = await conversationRepository.createConversation({
      customer_name,
      customer_phone,
      channel,
      assigned_agent,
    });

    return res.status(201).json(conversation);
  } catch (error) {
    console.error(error);

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

    return res.json(conversation);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

async function updateConversationState(req, res) {
  try {
    const { id } = req.params;
    const { current_state } = req.body;

    if (!current_state) {
      return res.status(400).json({
        error: 'current_state is required',
      });
    }

    const conversation = await conversationRepository.updateConversationState(
      id,
      current_state
    );

    return res.json(conversation);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

async function closeConversation(req, res) {
  try {
    const { id } = req.params;

    const conversation = await conversationRepository.closeConversation(id);

    return res.json(conversation);
  } catch (error) {
    console.error(error);

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