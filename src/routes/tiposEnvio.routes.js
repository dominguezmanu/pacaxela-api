const express = require('express');
const router = express.Router();

const TipoEnvioController = require('../controllers/tiposEnvio.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, TipoEnvioController.listar);
router.get('/:id', authMiddleware, TipoEnvioController.obtenerPorId);
router.post('/', authMiddleware, TipoEnvioController.crear);
router.put('/:id', authMiddleware, TipoEnvioController.actualizar);
router.delete('/:id', authMiddleware, TipoEnvioController.eliminar);

module.exports = router;
