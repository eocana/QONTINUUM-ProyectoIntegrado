const express = require('express');
const app = express();
const port = 3000;
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');

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
