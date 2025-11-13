// src/routes/usuarios.routes.js
const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/usuarios.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Todas las rutas de usuarios requieren token
router.get('/', authMiddleware, UsuarioController.listar);
router.get('/:id', authMiddleware, UsuarioController.obtenerPorId);
router.post('/', authMiddleware, UsuarioController.crear);
router.put('/:id', authMiddleware, UsuarioController.actualizar);
router.delete('/:id', authMiddleware, UsuarioController.eliminar);

module.exports = router;
