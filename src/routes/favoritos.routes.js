// src/routes/favoritos.routes.js
const express = require('express');
const router = express.Router();

const FavoritoController = require('../controllers/favoritos.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Todas las rutas protegidas con token
router.get('/', authMiddleware, FavoritoController.listar);
router.get('/:id', authMiddleware, FavoritoController.obtenerPorId);
router.post('/', authMiddleware, FavoritoController.crear);
router.delete('/:id', authMiddleware, FavoritoController.eliminar);

module.exports = router;
