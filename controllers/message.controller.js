
const conversationRepository = require('../repositories/conversation.repository');
const messageRepository = require('../repositories/message.repository');

async function createMessage(req, res){
    try {
        const { conversationId } = req.params;
        const { direction, senderType, content, messageType } = req.body;

        if (!direction || !senderType || !content) {
        return res.status(400).json({
            error: 'direction, senderType and content are required',
        });
        }
        
        const conversation = await conversationRepository.findConversationById(conversationId);
        if (!conversation) {
            return res.status(404).json({
                error: 'Conversation not found',
            });
        }
        
        const message  = await messageRepository.createMessage({
            conversationId,
            direction,
            senderType,
            content,
            messageType,
        });

        return res.status(201).json({ message });
    } catch (err) {
        console.error('Error creating message:', err);
        return res.status(500).json({
            error: 'Internal server error',
        });
    }
}

async function listMessagesByConversationId(req, res){
    try{
        const { conversationId } = req.params;
        const conversation = await conversationRepository.findConversationById(conversationId);
        if(!conversation){
            return res.status(404).json({
                error: 'Conversation not found',
            });
        }
        const messages = await messageRepository.findMessagesByConversationId(conversationId);
        return res.status(200).json({ messages });
    }catch(err){
        console.error('Error fetching messages:', err);
        return res.status(500).json({
            error: 'Internal server error',
        });
    }
}


module.exports = {
    createMessage,
    listMessagesByConversationId
}