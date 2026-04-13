require('dotenv').config();

const requiredEnvVars = [
    'DB_HOST',
    'DB_PORT',
    'DB_NAME',
    'DB_USER',
    'DB_PASSWORD',
]

for(const envVar of requiredEnvVars) {
    if(!process.env[envVar]) {
        throw new Error(`Environment variable ${envVar} is required but not set.`);
    }
}

const port = Number(process.env.PORT) || 3000;
const dbPort = Number(process.env.DB_PORT);

if (Number.isNaN(dbPort)) {
  throw new Error('DB_PORT must be a valid number');
}

module.exports = {
  port,
  nodeEnv: process.env.NODE_ENV || 'development',
  db: {
    host: process.env.DB_HOST,
    port: dbPort,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
};