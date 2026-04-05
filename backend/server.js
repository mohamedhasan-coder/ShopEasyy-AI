require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');
const { initializeSocket } = require('./src/socket/socketConfig');
const http = require('http');
const server = http.createServer(app);
initializeSocket(server);
connectDB();
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err);
    process.exit(1);
});