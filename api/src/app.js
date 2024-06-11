const express = require('express');
const cors = require('cors'); 
const app = express();
const port = 3000;
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:4200', // Permitir solicitudes desde esta URL
  optionsSuccessStatus: 200
}));

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
