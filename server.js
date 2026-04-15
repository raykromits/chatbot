const app = require('./app');
const config = require('./config/env');
const db = require('./database/db');

async function startServer() {
  try {
    await db.query('SELECT 1');

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();