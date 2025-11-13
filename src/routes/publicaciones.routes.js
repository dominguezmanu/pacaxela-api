const express = require('express');
const router = express.Router();

const PublicacionController = require('../controllers/publicaciones.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, PublicacionController.listar);
router.get('/:id', authMiddleware, PublicacionController.obtenerPorId);
router.post('/', authMiddleware, PublicacionController.crear);
router.put('/:id', authMiddleware, PublicacionController.actualizar);
router.delete('/:id', authMiddleware, PublicacionController.eliminar);

module.exports = router;
