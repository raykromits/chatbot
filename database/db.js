const { Pool } = require('pg');
const config = require('../config/env');

const pool = new Pool(config.db);

pool.on('connect', () => {
  console.log('Connected to PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Unexpected DB error:', err);
});

async function query(text, params) {
  return pool.query(text, params);
}

module.exports = {
  query,
  pool,
};