// src/controllers/categorias.controller.js
const CategoriaModel = require('../models/categorias.model');

const CategoriaController = {
  // GET /api/categorias
  async listar(req, res) {
    try {
      const categorias = await CategoriaModel.getAll();
      res.json({ ok: true, data: categorias });
    } catch (error) {
      console.error('Error al listar categorías:', error);
      res.status(500).json({ ok: false, message: 'Error al listar categorías' });
    }
  },

  // GET /api/categorias/:id
  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const categoria = await CategoriaModel.getById(id);

      if (!categoria) {
        return res.status(404).json({ ok: false, message: 'Categoría no encontrada' });
      }

      res.json({ ok: true, data: categoria });
    } catch (error) {
      console.error('Error al obtener categoría:', error);
      res.status(500).json({ ok: false, message: 'Error al obtener categoría' });
    }
  },

  // POST /api/categorias
  async crear(req, res) {
    try {
      const { nombre, descripcion } = req.body;

      if (!nombre) {
        return res.status(400).json({
          ok: false,
          message: 'El nombre de la categoría es obligatorio'
        });
      }

      const nueva = await CategoriaModel.create({ nombre, descripcion });

      res.status(201).json({
        ok: true,
        message: 'Categoría creada correctamente',
        data: nueva
      });
    } catch (error) {
      console.error('Error al crear categoría:', error);
      res.status(500).json({ ok: false, message: 'Error al crear categoría' });
    }
  },

  // PUT /api/categorias/:id
  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, descripcion } = req.body;

      if (!nombre) {
        return res.status(400).json({
          ok: false,
          message: 'El nombre de la categoría es obligatorio'
        });
      }

      const categoria = await CategoriaModel.getById(id);
      if (!categoria) {
        return res.status(404).json({ ok: false, message: 'Categoría no encontrada' });
      }

      await CategoriaModel.update(id, { nombre, descripcion });

      res.json({ ok: true, message: 'Categoría actualizada correctamente' });
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
      res.status(500).json({ ok: false, message: 'Error al actualizar categoría' });
    }
  },

  // DELETE /api/categorias/:id
  async eliminar(req, res) {
    try {
      const { id } = req.params;

      const categoria = await CategoriaModel.getById(id);
      if (!categoria) {
        return res.status(404).json({ ok: false, message: 'Categoría no encontrada' });
      }

      await CategoriaModel.delete(id);

      res.json({ ok: true, message: 'Categoría eliminada correctamente' });
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      res.status(500).json({ ok: false, message: 'Error al eliminar categoría' });
    }
  }
};

module.exports = CategoriaController;
