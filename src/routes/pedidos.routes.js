const express = require('express');
const router = express.Router();

const PedidoController = require('../controllers/pedidos.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, PedidoController.listar);
router.get('/:id', authMiddleware, PedidoController.obtenerPorId);
router.post('/', authMiddleware, PedidoController.crear);
router.put('/:id', authMiddleware, PedidoController.actualizar);
router.delete('/:id', authMiddleware, PedidoController.eliminar);

module.exports = router;
