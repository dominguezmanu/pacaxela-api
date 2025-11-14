const express = require('express');
const router = express.Router();

const MensajeController = require('../controllers/mensajes.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, MensajeController.listar);
router.get('/:id', authMiddleware, MensajeController.obtenerPorId);
router.post('/', authMiddleware, MensajeController.crear);
router.put('/:id', authMiddleware, MensajeController.actualizar);
router.patch('/:id/leido', authMiddleware, MensajeController.marcarLeido);
router.delete('/:id', authMiddleware, MensajeController.eliminar);

module.exports = router;
