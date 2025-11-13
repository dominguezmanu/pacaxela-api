// src/controllers/auth.controller.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UsuarioModel = require('../models/usuarios.model');

function generarToken(usuario) {
  const payload = {
    id_usuario: usuario.id_usuario,
    nombre: usuario.nombre,
    email: usuario.email,
    id_rol: usuario.id_rol
  };

  const secret = process.env.JWT_SECRET || 'jwt_simple_secret';

  // Expira en 2 horas (puedes cambiarlo)
  const token = jwt.sign(payload, secret, { expiresIn: '2h' });

  return token;
}

const AuthController = {
  // POST /api/auth/register
  async register(req, res) {
    try {
      const { nombre, email, password, telefono } = req.body;

      if (!nombre || !email || !password) {
        return res.status(400).json({
          ok: false,
          message: 'nombre, email y password son obligatorios'
        });
      }

      // ¿Ya existe el correo?
      const existe = await UsuarioModel.getByEmail(email);
      if (existe) {
        return res.status(400).json({
          ok: false,
          message: 'El correo ya está registrado'
        });
      }

      // Por defecto, rol 3 = comprador
      const nuevo = await UsuarioModel.create({
        nombre,
        email,
        password,
        telefono,
        id_rol: 3
      });

      const usuario = {
        id_usuario: nuevo.id_usuario,
        nombre,
        email,
        id_rol: 3
      };

      const token = generarToken(usuario);

      res.status(201).json({
        ok: true,
        message: 'Usuario registrado correctamente',
        token,
        user: usuario
      });
    } catch (error) {
      console.error('Error en register:', error);
      res.status(500).json({ ok: false, message: 'Error en el registro' });
    }
  },

  // POST /api/auth/login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          ok: false,
          message: 'email y password son obligatorios'
        });
      }

      const usuario = await UsuarioModel.getByEmail(email);
      if (!usuario) {
        return res.status(401).json({
          ok: false,
          message: 'Credenciales incorrectas'
        });
      }

      if (usuario.estado !== 'activo') {
        return res.status(403).json({
          ok: false,
          message: 'Usuario inactivo o suspendido'
        });
      }

      const passwordValida = await bcrypt.compare(password, usuario.password_hash);
      if (!passwordValida) {
        return res.status(401).json({
          ok: false,
          message: 'Credenciales incorrectas'
        });
      }

      const userPayload = {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        email: usuario.email,
        id_rol: usuario.id_rol
      };

      const token = generarToken(userPayload);

      res.json({
        ok: true,
        message: 'Login exitoso',
        token,
        user: userPayload
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ ok: false, message: 'Error en el login' });
    }
  },

  // GET /api/auth/me (requiere token)
  async me(req, res) {
    try {
      // req.user viene del middleware de auth
      if (!req.user) {
        return res.status(401).json({ ok: false, message: 'No autorizado' });
      }

      res.json({
        ok: true,
        user: req.user
      });
    } catch (error) {
      console.error('Error en me:', error);
      res.status(500).json({ ok: false, message: 'Error al obtener usuario' });
    }
  }
};

module.exports = AuthController;
