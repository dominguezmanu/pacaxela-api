const express = require('express');
const router = express.Router();

const DireccionController = require('../controllers/direcciones.controller');
const authMiddleware = require('../middlewares/auth.middleware');



router.get('/', authMiddleware, DireccionController.listar);
router.get('/:id', authMiddleware, DireccionController.obtenerPorId);
router.post('/', authMiddleware, DireccionController.crear);
router.put('/:id', authMiddleware, DireccionController.actualizar);
router.delete('/:id', authMiddleware, DireccionController.eliminar);

module.exports = router;
