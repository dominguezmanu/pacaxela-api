const express = require('express');
const router = express.Router();

const CategoriaController = require('../controllers/categorias.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// CRUD de categorías 
router.get('/', authMiddleware, CategoriaController.listar);
router.get('/:id', authMiddleware, CategoriaController.obtenerPorId);
router.post('/', authMiddleware, CategoriaController.crear);
router.put('/:id', authMiddleware, CategoriaController.actualizar);
router.delete('/:id', authMiddleware, CategoriaController.eliminar);

module.exports = router;
