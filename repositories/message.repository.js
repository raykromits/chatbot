const db = require('../database/db');

async function createMessage({
    conversationId,
    direction,
    senderType,
    content,
    messageType = 'text',
}){
    const query = `INSERT INTO messages(
    conversation_id,
    direction,
    sender_type,
    content,
    message_type
    ) 
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    const values = [
        conversationId,
        direction,
        senderType,
        content,
        messageType
    ];
    
    const { rows } = await db.query(query, values);
    return rows[0]
}

async function findMessagesByConversationId(conversationId) {
  const sql = `
    SELECT *
    FROM messages
    WHERE conversation_id = $1
    ORDER BY created_at ASC;
  `;

  const { rows } = await db.query(sql, [conversationId]);
  return rows;
}

async function findLastMessageByConversationId(conversationId) {
  const sql = `
    SELECT *
    FROM messages
    WHERE conversation_id = $1
    ORDER BY created_at DESC
    LIMIT 1;
  `;

  const { rows } = await db.query(sql, [conversationId]);
  return rows[0] || null;
}

module.exports = {
    createMessage,
    findMessagesByConversationId,
    findLastMessageByConversationId
}