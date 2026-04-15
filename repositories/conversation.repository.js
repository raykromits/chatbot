const db = require('../database/db');

async function createConversation(data) {
  const query = `
    INSERT INTO conversations (
      customer_name,
      customer_phone,
      channel,
      assigned_agent,
      status,
      current_state
    )
    VALUES ($1, $2, $3, $4, 'open', 'INITIAL')
    RETURNING *
  `;

  const values = [
    data.customer_name || null,
    data.customer_phone,
    data.channel || 'whatsapp',
    data.assigned_agent || null,
  ];

  const result = await db.query(query, values);
  return result.rows[0];
}

async function findConversationById(id) {
  const result = await db.query(
    'SELECT * FROM conversations WHERE id = $1',
    [id]
  );

  return result.rows[0] || null;
}

async function updateConversationState(id, currentState) {
  const result = await db.query(
    `
    UPDATE conversations
    SET current_state = $1, updated_at = NOW()
    WHERE id = $2
    RETURNING *
    `,
    [currentState, id]
  );

  return result.rows[0] || null;
}

async function closeConversation(id) {
  const result = await db.query(
    `
    UPDATE conversations
    SET status = 'closed', closed_at = NOW(), updated_at = NOW()
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  return result.rows[0] || null;
}

module.exports = {
  createConversation,
  findConversationById,
  updateConversationState,
  closeConversation,
};