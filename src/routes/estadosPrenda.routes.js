const express = require('express');
const router = express.Router();

const EstadoPrendaController = require('../controllers/estadosPrenda.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, EstadoPrendaController.listar);
router.get('/:id', authMiddleware, EstadoPrendaController.obtenerPorId);
router.post('/', authMiddleware, EstadoPrendaController.crear);
router.put('/:id', authMiddleware, EstadoPrendaController.actualizar);
router.delete('/:id', authMiddleware, EstadoPrendaController.eliminar);

module.exports = router;
