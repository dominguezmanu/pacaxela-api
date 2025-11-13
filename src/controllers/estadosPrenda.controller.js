const EstadoPrendaModel = require('../models/estadosPrenda.model');

const EstadoPrendaController = {
  
  async listar(req, res) {
    try {
      const estados = await EstadoPrendaModel.getAll();
      res.json({ ok: true, data: estados });
    } catch (error) {
      console.error('Error al listar estados de prenda:', error);
      res.status(500).json({ ok: false, message: 'Error al listar estados de prenda' });
    }
  },


  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const estado = await EstadoPrendaModel.getById(id);

      if (!estado) {
        return res.status(404).json({ ok: false, message: 'Estado de prenda no encontrado' });
      }

      res.json({ ok: true, data: estado });
    } catch (error) {
      console.error('Error al obtener estado de prenda:', error);
      res.status(500).json({ ok: false, message: 'Error al obtener estado de prenda' });
    }
  },

  async crear(req, res) {
    try {
      const { nombre, descripcion } = req.body;

      if (!nombre) {
        return res.status(400).json({
          ok: false,
          message: 'El nombre del estado de prenda es obligatorio'
        });
      }

      const nuevo = await EstadoPrendaModel.create({ nombre, descripcion });

      res.status(201).json({
        ok: true,
        message: 'Estado de prenda creado correctamente',
        data: nuevo
      });
    } catch (error) {
      console.error('Error al crear estado de prenda:', error);
      res.status(500).json({ ok: false, message: 'Error al crear estado de prenda' });
    }
  },


  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, descripcion } = req.body;

      if (!nombre) {
        return res.status(400).json({
          ok: false,
          message: 'El nombre del estado de prenda es obligatorio'
        });
      }

      const estado = await EstadoPrendaModel.getById(id);
      if (!estado) {
        return res.status(404).json({ ok: false, message: 'Estado de prenda no encontrado' });
      }

      await EstadoPrendaModel.update(id, { nombre, descripcion });

      res.json({ ok: true, message: 'Estado de prenda actualizado correctamente' });
    } catch (error) {
      console.error('Error al actualizar estado de prenda:', error);
      res.status(500).json({ ok: false, message: 'Error al actualizar estado de prenda' });
    }
  },


  
  async eliminar(req, res) {
    try {
      const { id } = req.params;

      const estado = await EstadoPrendaModel.getById(id);
      if (!estado) {
        return res.status(404).json({ ok: false, message: 'Estado de prenda no encontrado' });
      }

      await EstadoPrendaModel.delete(id);

      res.json({ ok: true, message: 'Estado de prenda eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar estado de prenda:', error);
      res.status(500).json({ ok: false, message: 'Error al eliminar estado de prenda' });
    }
  }
};

module.exports = EstadoPrendaController;
