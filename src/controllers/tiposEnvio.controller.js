const TipoEnvioModel = require('../models/tiposEnvio.model');

const TipoEnvioController = {
  async listar(req, res) {
    try {
      const tipos = await TipoEnvioModel.getAll();
      res.json({ ok: true, data: tipos });
    } catch (error) {
      console.error('Error al listar tipos de envío:', error);
      res.status(500).json({ ok: false, message: 'Error al listar tipos de envío' });
    }
  },

  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const tipo = await TipoEnvioModel.getById(id);

      if (!tipo) {
        return res.status(404).json({ ok: false, message: 'Tipo de envío no encontrado' });
      }

      res.json({ ok: true, data: tipo });
    } catch (error) {
      console.error('Error al obtener tipo de envío:', error);
      res.status(500).json({ ok: false, message: 'Error al obtener tipo de envío' });
    }
  },

  async crear(req, res) {
    try {
      const { nombre, descripcion, costo_base } = req.body;

      if (!nombre) {
        return res.status(400).json({
          ok: false,
          message: 'El nombre del tipo de envío es obligatorio'
        });
      }

      const nuevo = await TipoEnvioModel.create({
        nombre,
        descripcion,
        costo_base
      });

      res.status(201).json({
        ok: true,
        message: 'Tipo de envío creado correctamente',
        data: nuevo
      });
    } catch (error) {
      console.error('Error al crear tipo de envío:', error);
      res.status(500).json({ ok: false, message: 'Error al crear tipo de envío' });
    }
  },

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, descripcion, costo_base } = req.body;

      if (!nombre) {
        return res.status(400).json({
          ok: false,
          message: 'El nombre del tipo de envío es obligatorio'
        });
      }

      const tipo = await TipoEnvioModel.getById(id);
      if (!tipo) {
        return res.status(404).json({ ok: false, message: 'Tipo de envío no encontrado' });
      }

      await TipoEnvioModel.update(id, { nombre, descripcion, costo_base });

      res.json({ ok: true, message: 'Tipo de envío actualizado correctamente' });
    } catch (error) {
      console.error('Error al actualizar tipo de envío:', error);
      res.status(500).json({ ok: false, message: 'Error al actualizar tipo de envío' });
    }
  },

  async eliminar(req, res) {
    try {
      const { id } = req.params;

      const tipo = await TipoEnvioModel.getById(id);
      if (!tipo) {
        return res.status(404).json({ ok: false, message: 'Tipo de envío no encontrado' });
      }

      await TipoEnvioModel.delete(id);

      res.json({ ok: true, message: 'Tipo de envío eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar tipo de envío:', error);
      res.status(500).json({ ok: false, message: 'Error al eliminar tipo de envío' });
    }
  }
};

module.exports = TipoEnvioController;
