const express = require('express');
const router = express.Router();

const MetodoPagoController = require('../controllers/metodosPago.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, MetodoPagoController.listar);
router.get('/:id', authMiddleware, MetodoPagoController.obtenerPorId);
router.post('/', authMiddleware, MetodoPagoController.crear);
router.put('/:id', authMiddleware, MetodoPagoController.actualizar);
router.delete('/:id', authMiddleware, MetodoPagoController.eliminar);

module.exports = router;
