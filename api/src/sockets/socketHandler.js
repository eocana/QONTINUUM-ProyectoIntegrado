const socketIo = require('socket.io');
const userSocket = require('./userSocket');

function setupSockets(server) {
    const io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected');
        userSocket(io, socket);

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
}

module.exports = { setupSockets };
