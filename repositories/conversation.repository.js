const  db = require('../database/db');

async function createConversation({
    customerName = null,
    customerPhone,
    channel = 'whatsapp',
    status = 'open',
    currentState = 'initial',
    assignedAgent = null,
}){
    const query = `INSERT INTO conversations(
        customer_name,
        customer_phone,
        channel,
        status,
        current_state,
        assigned_agent
    ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

    const values = [
        customerName,
        customerPhone,
        channel,
        status,
        currentState,
        assignedAgent
    ];
    const { rows } = await db.query(query, values);
    return rows[0];

}

async function findConversationById(conversationId){

    const query = `
        SELECT * 
        FROM conversations
        WHERE id = $1
    `;

    const { rows } = await db.query(query, [conversationId]);

    return rows[0] || null;

}

async function findOpenConversationByPhone(customerPhone){
    const query = `
        SELECT *
        FROM conversations
        WHERE customer_phone = $1 AND status = 'open'
        ORDER BY created_at DESC
        LIMIT 1
    `;
    const { rows } = await db.query(query, [customerPhone]);
    return rows[0] || null;
}   

async function updateConversationState(conversationId, newState){
    const query = `
        UPDATE conversations
        SET current_state = $1, updated_at = NOW()
        WHERE id = $2
        RETURNING *
    `;

    const { rows } = await db.query(query, [newState, conversationId]);
    return rows[0] || null;
}

async function closeConversation(conversationId){
    const query = `
        UPDATE conversations
        SET status = 'closed', closed_at = NOW(), updated_at = NOW()
        WHERE id = $1
        RETURNING *
    `;

    const { rows } = await db.query(query, [conversationId]);
    return rows[0] || null;
}

module.exports = {
  createConversation,
  findConversationById,
  findOpenConversationByPhone,
  updateConversationState,
  closeConversation,
};