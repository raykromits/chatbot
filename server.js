const app = require('./app');
const config = require('./config/env');
const db = require('./database/db');

// Start server

async function startServer() {
    try{
        await db.querey('SELECT 1'); // Test database connection

        app.listen(config.port, () => {
            console.log(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
        });

    }catch(err){
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}

startServer();