const express = require('express');
const router = express.Router();

const EstadoPedidoController = require('../controllers/estadosPedido.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, EstadoPedidoController.listar);
router.get('/:id', authMiddleware, EstadoPedidoController.obtenerPorId);
router.post('/', authMiddleware, EstadoPedidoController.crear);
router.put('/:id', authMiddleware, EstadoPedidoController.actualizar);
router.delete('/:id', authMiddleware, EstadoPedidoController.eliminar);

module.exports = router;
