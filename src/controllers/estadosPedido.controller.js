const EstadoPedidoModel = require('../models/estadosPedido.model');

const EstadoPedidoController = {
  async listar(req, res) {
    try {
      const estados = await EstadoPedidoModel.getAll();
      res.json({ ok: true, data: estados });
    } catch (error) {
      console.error('Error al listar estados de pedido:', error);
      res.status(500).json({ ok: false, message: 'Error al listar estados de pedido' });
    }
  },

  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const estado = await EstadoPedidoModel.getById(id);

      if (!estado) {
        return res.status(404).json({ ok: false, message: 'Estado de pedido no encontrado' });
      }

      res.json({ ok: true, data: estado });
    } catch (error) {
      console.error('Error al obtener estado de pedido:', error);
      res.status(500).json({ ok: false, message: 'Error al obtener estado de pedido' });
    }
  },

  async crear(req, res) {
    try {
      const { nombre, descripcion } = req.body;

      if (!nombre) {
        return res.status(400).json({
          ok: false,
          message: 'El nombre del estado de pedido es obligatorio'
        });
      }

      const nuevo = await EstadoPedidoModel.create({ nombre, descripcion });

      res.status(201).json({
        ok: true,
        message: 'Estado de pedido creado correctamente',
        data: nuevo
      });
    } catch (error) {
      console.error('Error al crear estado de pedido:', error);
      res.status(500).json({ ok: false, message: 'Error al crear estado de pedido' });
    }
  },

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, descripcion } = req.body;

      if (!nombre) {
        return res.status(400).json({
          ok: false,
          message: 'El nombre del estado de pedido es obligatorio'
        });
      }

      const estado = await EstadoPedidoModel.getById(id);
      if (!estado) {
        return res.status(404).json({ ok: false, message: 'Estado de pedido no encontrado' });
      }

      await EstadoPedidoModel.update(id, { nombre, descripcion });

      res.json({ ok: true, message: 'Estado de pedido actualizado correctamente' });
    } catch (error) {
      console.error('Error al actualizar estado de pedido:', error);
      res.status(500).json({ ok: false, message: 'Error al actualizar estado de pedido' });
    }
  },

  async eliminar(req, res) {
    try {
      const { id } = req.params;

      const estado = await EstadoPedidoModel.getById(id);
      if (!estado) {
        return res.status(404).json({ ok: false, message: 'Estado de pedido no encontrado' });
      }

      await EstadoPedidoModel.delete(id);

      res.json({ ok: true, message: 'Estado de pedido eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar estado de pedido:', error);
      res.status(500).json({ ok: false, message: 'Error al eliminar estado de pedido' });
    }
  }
};

module.exports = EstadoPedidoController;
