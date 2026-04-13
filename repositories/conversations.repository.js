const db = require('../config/database');

async function createFunction({customerPhone, customerName, currentState}){

    const query = 'INSERT INTO conversations (customer_phone, customer_name, current_state) VALUES ($1, $2, $3) RETURNING *';
    const values = [customerPhone, customerName, currentState];

    const res = await db.query(query, values);
    return res.rows[0] || null;

}

async function findConversationByPhone(customerPhone) {
    const query = 'SELECT * FROM conversations WHERE customer_phone = $1';
    const values = [customerPhone];

    const res = await db.query(query, values);
    return res.rows[0] || null;

}

module.exports = {
    createFunction,
    findConversationByPhone
}