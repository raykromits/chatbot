const db = require('../database/db');

async function healthCheck(req, res) {
  try {
    const result = await db.query('SELECT NOW() AS server_time');

    return res.status(200).json({
      status: 'ok',
      message: 'Server running and database connection successful',
      time: result.rows[0].server_time,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
    });
  }
}

module.exports = {
  healthCheck,
};