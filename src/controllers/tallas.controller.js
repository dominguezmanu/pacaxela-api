// src/controllers/tallas.controller.js
const TallaModel = require('../models/tallas.model');

const TallaController = {
  // GET /api/tallas
  async listar(req, res) {
    try {
      const tallas = await TallaModel.getAll();
      res.json({ ok: true, data: tallas });
    } catch (error) {
      console.error('Error al listar tallas:', error);
      res.status(500).json({ ok: false, message: 'Error al listar tallas' });
    }
  },

  // GET /api/tallas/:id
  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const talla = await TallaModel.getById(id);

      if (!talla) {
        return res.status(404).json({ ok: false, message: 'Talla no encontrada' });
      }

      res.json({ ok: true, data: talla });
    } catch (error) {
      console.error('Error al obtener talla:', error);
      res.status(500).json({ ok: false, message: 'Error al obtener talla' });
    }
  },

  // POST /api/tallas
  async crear(req, res) {
    try {
      const { nombre, descripcion } = req.body;

      if (!nombre) {
        return res.status(400).json({
          ok: false,
          message: 'El nombre de la talla es obligatorio'
        });
      }

      const nueva = await TallaModel.create({ nombre, descripcion });

      res.status(201).json({
        ok: true,
        message: 'Talla creada correctamente',
        data: nueva
      });
    } catch (error) {
      console.error('Error al crear talla:', error);
      res.status(500).json({ ok: false, message: 'Error al crear talla' });
    }
  },

  // PUT /api/tallas/:id
  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, descripcion } = req.body;

      if (!nombre) {
        return res.status(400).json({
          ok: false,
          message: 'El nombre de la talla es obligatorio'
        });
      }

      const talla = await TallaModel.getById(id);
      if (!talla) {
        return res.status(404).json({ ok: false, message: 'Talla no encontrada' });
      }

      await TallaModel.update(id, { nombre, descripcion });

      res.json({ ok: true, message: 'Talla actualizada correctamente' });
    } catch (error) {
      console.error('Error al actualizar talla:', error);
      res.status(500).json({ ok: false, message: 'Error al actualizar talla' });
    }
  },

  // DELETE /api/tallas/:id
  async eliminar(req, res) {
    try {
      const { id } = req.params;

      const talla = await TallaModel.getById(id);
      if (!talla) {
        return res.status(404).json({ ok: false, message: 'Talla no encontrada' });
      }

      await TallaModel.delete(id);

      res.json({ ok: true, message: 'Talla eliminada correctamente' });
    } catch (error) {
      console.error('Error al eliminar talla:', error);
      res.status(500).json({ ok: false, message: 'Error al eliminar talla' });
    }
  }
};

module.exports = TallaController;
