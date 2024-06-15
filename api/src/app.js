const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const { userSocket } = require('./sockets/userSocket');

const app = express();
const server = http.createServer(app);

// Configurar CORS
app.use(cors({
  origin: '*', // Permitir solicitudes desde cualquier URL
  optionsSuccessStatus: 200
}));

// Configurar middleware para parsear JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});
// Rutas API
app.use('/api', userRoutes);

// Configurar Sockets
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
  userSocket(socket);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
