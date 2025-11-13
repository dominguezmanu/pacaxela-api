const express = require('express');
const router = express.Router();

const FotoPublicacionController = require('../controllers/fotosPublicacion.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, FotoPublicacionController.listar);
router.get('/:id', authMiddleware, FotoPublicacionController.obtenerPorId);
router.post('/', authMiddleware, FotoPublicacionController.crear);
router.put('/:id', authMiddleware, FotoPublicacionController.actualizar);
router.delete('/:id', authMiddleware, FotoPublicacionController.eliminar);

module.exports = router;
