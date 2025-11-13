// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Registrar nuevo usuario (rol comprador por defecto)
router.post('/register', AuthController.register);

// Login
router.post('/login', AuthController.login);

// Ver quién soy, usando el token
router.get('/me', authMiddleware, AuthController.me);

module.exports = router;
