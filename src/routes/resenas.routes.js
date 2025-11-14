const express = require('express');
const router = express.Router();

const ResenaController = require('../controllers/resenas.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, ResenaController.listar);
router.get('/:id', authMiddleware, ResenaController.obtenerPorId);
router.post('/', authMiddleware, ResenaController.crear);
router.put('/:id', authMiddleware, ResenaController.actualizar);
router.delete('/:id', authMiddleware, ResenaController.eliminar);

module.exports = router;
