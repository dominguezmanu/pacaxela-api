const express = require('express');
const router = express.Router();

const RolController = require('../controllers/roles.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, RolController.listar);
router.get('/:id', authMiddleware, RolController.obtenerPorId);
router.post('/', authMiddleware, RolController.crear);
router.put('/:id', authMiddleware, RolController.actualizar);
router.delete('/:id', authMiddleware, RolController.eliminar);

module.exports = router;
