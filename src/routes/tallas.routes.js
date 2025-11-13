const express = require('express');
const router = express.Router();

const TallaController = require('../controllers/tallas.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Todas protegidas con token
router.get('/', authMiddleware, TallaController.listar);
router.get('/:id', authMiddleware, TallaController.obtenerPorId);
router.post('/', authMiddleware, TallaController.crear);
router.put('/:id', authMiddleware, TallaController.actualizar);
router.delete('/:id', authMiddleware, TallaController.eliminar);

module.exports = router;
