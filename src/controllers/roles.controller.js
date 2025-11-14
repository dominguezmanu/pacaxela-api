const RolModel = require('../models/roles.model');

const RolController = {
  async listar(req, res) {
    try {
      const roles = await RolModel.getAll();
      res.json({ ok: true, data: roles });
    } catch (error) {
      console.error('Error al listar roles:', error);
      res.status(500).json({ ok: false, message: 'Error al listar roles' });
    }
  },

  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const rol = await RolModel.getById(id);

      if (!rol) {
        return res.status(404).json({ ok: false, message: 'Rol no encontrado' });
      }

      res.json({ ok: true, data: rol });
    } catch (error) {
      console.error('Error al obtener rol:', error);
      res.status(500).json({ ok: false, message: 'Error al obtener rol' });
    }
  },

  async crear(req, res) {
    try {
      const { nombre, descripcion } = req.body;

      if (!nombre) {
        return res.status(400).json({
          ok: false,
          message: 'El nombre del rol es obligatorio'
        });
      }

      const nuevo = await RolModel.create({ nombre, descripcion });

      res.status(201).json({
        ok: true,
        message: 'Rol creado correctamente',
        data: nuevo
      });
    } catch (error) {
      console.error('Error al crear rol:', error);
      res.status(500).json({ ok: false, message: 'Error al crear rol' });
    }
  },

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, descripcion } = req.body;

      if (!nombre) {
        return res.status(400).json({
          ok: false,
          message: 'El nombre del rol es obligatorio'
        });
      }

      const rol = await RolModel.getById(id);
      if (!rol) {
        return res.status(404).json({ ok: false, message: 'Rol no encontrado' });
      }

      await RolModel.update(id, { nombre, descripcion });

      res.json({ ok: true, message: 'Rol actualizado correctamente' });
    } catch (error) {
      console.error('Error al actualizar rol:', error);
      res.status(500).json({ ok: false, message: 'Error al actualizar rol' });
    }
  },

  async eliminar(req, res) {
    try {
      const { id } = req.params;

      const rol = await RolModel.getById(id);
      if (!rol) {
        return res.status(404).json({ ok: false, message: 'Rol no encontrado' });
      }

      await RolModel.delete(id);

      res.json({ ok: true, message: 'Rol eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar rol:', error);
      res.status(500).json({ ok: false, message: 'Error al eliminar rol' });
    }
  }
};

module.exports = RolController;
