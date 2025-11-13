// src/routes/index.js
const express = require('express');
const router = express.Router();

const usuarioRoutes = require('./usuarios.routes');
const authRoutes = require('./auth.routes');

// Auth
router.use('/auth', authRoutes);

// Usuarios
router.use('/usuarios', usuarioRoutes);

module.exports = router;
