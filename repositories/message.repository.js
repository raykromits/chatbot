const db = require('../database/db');

async function createMessage(data) {
  const query = `
    INSERT INTO messages (
      conversation_id,
      direction,
      sender_type,
      content,
      message_type
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const values = [
    data.conversation_id,
    data.direction,
    data.sender_type,
    data.content,
    data.message_type || 'text',
  ];

  const result = await db.query(query, values);
  return result.rows[0];
}

async function findMessagesByConversationId(conversationId) {
  const result = await db.query(
    `
    SELECT *
    FROM messages
    WHERE conversation_id = $1
    ORDER BY created_at ASC
    `,
    [conversationId]
  );

  return result.rows;
}

module.exports = {
  createMessage,
  findMessagesByConversationId,
};