const MetodoPagoModel = require('../models/metodosPago.model');

const MetodoPagoController = {
  async listar(req, res) {
    try {
      const metodos = await MetodoPagoModel.getAll();
      res.json({ ok: true, data: metodos });
    } catch (error) {
      console.error('Error al listar métodos de pago:', error);
      res.status(500).json({ ok: false, message: 'Error al listar métodos de pago' });
    }
  },

  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const metodo = await MetodoPagoModel.getById(id);

      if (!metodo) {
        return res.status(404).json({ ok: false, message: 'Método de pago no encontrado' });
      }

      res.json({ ok: true, data: metodo });
    } catch (error) {
      console.error('Error al obtener método de pago:', error);
      res.status(500).json({ ok: false, message: 'Error al obtener método de pago' });
    }
  },

  async crear(req, res) {
    try {
      const { nombre, descripcion } = req.body;

      if (!nombre) {
        return res.status(400).json({
          ok: false,
          message: 'El nombre del método de pago es obligatorio'
        });
      }

      const nuevo = await MetodoPagoModel.create({ nombre, descripcion });

      res.status(201).json({
        ok: true,
        message: 'Método de pago creado correctamente',
        data: nuevo
      });
    } catch (error) {
      console.error('Error al crear método de pago:', error);
      res.status(500).json({ ok: false, message: 'Error al crear método de pago' });
    }
  },

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, descripcion } = req.body;

      if (!nombre) {
        return res.status(400).json({
          ok: false,
          message: 'El nombre del método de pago es obligatorio'
        });
      }

      const metodo = await MetodoPagoModel.getById(id);
      if (!metodo) {
        return res.status(404).json({ ok: false, message: 'Método de pago no encontrado' });
      }

      await MetodoPagoModel.update(id, { nombre, descripcion });

      res.json({ ok: true, message: 'Método de pago actualizado correctamente' });
    } catch (error) {
      console.error('Error al actualizar método de pago:', error);
      res.status(500).json({ ok: false, message: 'Error al actualizar método de pago' });
    }
  },

  async eliminar(req, res) {
    try {
      const { id } = req.params;

      const metodo = await MetodoPagoModel.getById(id);
      if (!metodo) {
        return res.status(404).json({ ok: false, message: 'Método de pago no encontrado' });
      }

      await MetodoPagoModel.delete(id);

      res.json({ ok: true, message: 'Método de pago eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar método de pago:', error);
      res.status(500).json({ ok: false, message: 'Error al eliminar método de pago' });
    }
  }
};

module.exports = MetodoPagoController;
