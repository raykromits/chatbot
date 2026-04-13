const db = require('../database/db');

async function healthCheck(req, res){
    try{
        result = await db.query('SELECT NOW() AS server_time');
        
        return res.status(200).json({
            status: 'ok',
            message: 'Server running and database connection successful',
            time: result.rows[0].server_time,
        })
    }catch(err){
        console.error('Health check failed:', err);
        return res.status(500).json({
            status: 'error',
            message: 'Server running but database connection failed',
            error: err.message,
        });
    }
    
}