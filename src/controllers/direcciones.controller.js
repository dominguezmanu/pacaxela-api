const DireccionModel = require('../models/direcciones.model');

const DireccionController = {
  async listar(req, res) {
    try {
      const { id_usuario } = req.query;

      let direcciones;
      if (id_usuario) {
        direcciones = await DireccionModel.getByUsuario(id_usuario);
      } else {
        direcciones = await DireccionModel.getAll();
      }

      res.json({ ok: true, data: direcciones });
    } catch (error) {
      console.error('Error al listar direcciones:', error);
      res.status(500).json({ ok: false, message: 'Error al listar direcciones' });
    }
  },

  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const direccion = await DireccionModel.getById(id);

      if (!direccion) {
        return res.status(404).json({ ok: false, message: 'Dirección no encontrada' });
      }

      res.json({ ok: true, data: direccion });
    } catch (error) {
      console.error('Error al obtener dirección:', error);
      res.status(500).json({ ok: false, message: 'Error al obtener dirección' });
    }
  },

  async crear(req, res) {
    try {
      const {
        id_usuario,
        titulo,
        direccion_completa,
        ciudad,
        departamento,
        referencia,
        es_principal
      } = req.body;

      if (!id_usuario || !titulo || !direccion_completa || !ciudad || !departamento) {
        return res.status(400).json({
          ok: false,
          message: 'id_usuario, titulo, direccion_completa, ciudad y departamento son obligatorios'
        });
      }

      const nueva = await DireccionModel.create({
        id_usuario,
        titulo,
        direccion_completa,
        ciudad,
        departamento,
        referencia,
        es_principal
      });

      res.status(201).json({
        ok: true,
        message: 'Dirección creada correctamente',
        data: nueva
      });
    } catch (error) {
      console.error('Error al crear dirección:', error);
      res.status(500).json({ ok: false, message: 'Error al crear dirección' });
    }
  },

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const {
        id_usuario,
        titulo,
        direccion_completa,
        ciudad,
        departamento,
        referencia,
        es_principal
      } = req.body;

      if (!id_usuario || !titulo || !direccion_completa || !ciudad || !departamento) {
        return res.status(400).json({
          ok: false,
          message: 'id_usuario, titulo, direccion_completa, ciudad y departamento son obligatorios'
        });
      }

      const direccion = await DireccionModel.getById(id);
      if (!direccion) {
        return res.status(404).json({ ok: false, message: 'Dirección no encontrada' });
      }

      await DireccionModel.update(id, {
        id_usuario,
        titulo,
        direccion_completa,
        ciudad,
        departamento,
        referencia,
        es_principal
      });

      res.json({ ok: true, message: 'Dirección actualizada correctamente' });
    } catch (error) {
      console.error('Error al actualizar dirección:', error);
      res.status(500).json({ ok: false, message: 'Error al actualizar dirección' });
    }
  },

  async eliminar(req, res) {
    try {
      const { id } = req.params;

      const direccion = await DireccionModel.getById(id);
      if (!direccion) {
        return res.status(404).json({ ok: false, message: 'Dirección no encontrada' });
      }

      await DireccionModel.delete(id);

      res.json({ ok: true, message: 'Dirección eliminada correctamente' });
    } catch (error) {
      console.error('Error al eliminar dirección:', error);
      res.status(500).json({ ok: false, message: 'Error al eliminar dirección' });
    }
  }
};

module.exports = DireccionController;
