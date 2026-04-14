const express = require('express');

const healthRoutes = require('./routes/health.routes');
const conversationRoutes = require('./routes/conversations.routes');
const messageRoutes = require('./routes/message.routes');

const app = express();

app.use(express.json());

app.use('/api', healthRoutes);
app.use('/api', conversationRoutes);
app.use('/api', messageRoutes);

module.exports = app;