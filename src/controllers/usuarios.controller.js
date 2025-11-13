const UsuarioModel = require('../models/usuarios.model');

const UsuarioController = {
  // GET /api/usuarios
  async listar(req, res) {
    try {
      const usuarios = await UsuarioModel.getAll();
      res.json({ ok: true, data: usuarios });
    } catch (error) {
      console.error('Error al listar usuarios:', error);
      res.status(500).json({ ok: false, message: 'Error al listar usuarios' });
    }
  },

  // GET /api/usuarios/:id
  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioModel.getById(id);

      if (!usuario) {
        return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
      }

      res.json({ ok: true, data: usuario });
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      res.status(500).json({ ok: false, message: 'Error al obtener usuario' });
    }
  },

  // POST /api/usuarios
  async crear(req, res) {
    try {
      const { nombre, email, password, telefono, id_rol } = req.body;

      if (!nombre || !email || !password || !id_rol) {
        return res.status(400).json({
          ok: false,
          message: 'nombre, email, password e id_rol son obligatorios'
        });
      }

      const nuevo = await UsuarioModel.create({ nombre, email, password, telefono, id_rol });
      res.status(201).json({ ok: true, message: 'Usuario creado', data: nuevo });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ ok: false, message: 'Error al crear usuario' });
    }
  },

  // PUT /api/usuarios/:id
  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, email, telefono, id_rol, estado } = req.body;

      if (!nombre || !email || !id_rol || !estado) {
        return res.status(400).json({
          ok: false,
          message: 'nombre, email, id_rol y estado son obligatorios'
        });
      }

      const usuario = await UsuarioModel.getById(id);
      if (!usuario) {
        return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
      }

      await UsuarioModel.update(id, { nombre, email, telefono, id_rol, estado });
      res.json({ ok: true, message: 'Usuario actualizado' });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({ ok: false, message: 'Error al actualizar usuario' });
    }
  },

  // DELETE /api/usuarios/:id
  async eliminar(req, res) {
    try {
      const { id } = req.params;

      const usuario = await UsuarioModel.getById(id);
      if (!usuario) {
        return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
      }

      await UsuarioModel.delete(id);
      res.json({ ok: true, message: 'Usuario eliminado' });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({ ok: false, message: 'Error al eliminar usuario' });
    }
  }
};

module.exports = UsuarioController;
