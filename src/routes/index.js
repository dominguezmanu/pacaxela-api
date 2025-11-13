// src/routes/index.js
const express = require('express');
const router = express.Router();

const usuarioRoutes = require('./usuarios.routes');
const authRoutes = require('./auth.routes');
const categoriaRoutes = require('./categorias.routes');



router.use('/auth', authRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/tallas', tallaRoutes);
module.exports = router;
