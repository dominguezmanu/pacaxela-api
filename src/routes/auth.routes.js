const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Registrar nuevo usuario 
router.post('/register', AuthController.register);

// Login
router.post('/login', AuthController.login);

// Ver quién soy con el toekn
router.get('/me', authMiddleware, AuthController.me);

module.exports = router;
