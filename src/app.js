const express = require('express');
const cors = require('cors');
const path = require('path');

const apiRoutes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'Pacaxela API corriendo'
  });
});

app.use('/api', apiRoutes);

module.exports = app;
