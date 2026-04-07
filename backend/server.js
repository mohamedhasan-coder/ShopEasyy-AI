const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

dotenv.config();
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const PORT = process.env.PORT || 5000;

// Database
const connectDB = require('./src/config/db');
connectDB();

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/products', require('./src/routes/products'));
app.use('/api/orders', require('./src/routes/orders'));
app.use('/api/ai', require('./src/routes/ai'));

app.use(require('./src/middleware/errorHandler'));

// Socket.io for real-time order tracking
const io = new Server(server, { cors: { origin: '*' } });
io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
  socket.on('joinOrder', (orderId) => {
    socket.join(orderId);
  });
});

// expose io via app.locals for controllers
app.locals.io = io;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
