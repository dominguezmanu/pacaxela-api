require('dotenv').config();
const express = require('express');
const cors = require('cors');



const routes = require('./routes');

const app = require('./app');
const PORT = process.env.PORT || 3000;


// Middlewares
app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/api', routes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ ok: true, message: 'API Pacaxela funcionando' });
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});