const PedidoModel = require('../models/pedidos.model');
const PublicacionModel = require('../models/publicaciones.model');

const PedidoController = {
  async listar(req, res) {
    try {
      const { id_comprador, id_vendedor, id_estado_pedido } = req.query;

      const filtros = {};
      if (id_comprador) filtros.id_comprador = id_comprador;
      if (id_vendedor) filtros.id_vendedor = id_vendedor;
      if (id_estado_pedido) filtros.id_estado_pedido = id_estado_pedido;

      const pedidos = await PedidoModel.getAll(filtros);
      res.json({ ok: true, data: pedidos });
    } catch (error) {
      console.error('Error al listar pedidos:', error);
      res.status(500).json({ ok: false, message: 'Error al listar pedidos' });
    }
  },

  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const pedido = await PedidoModel.getById(id);

      if (!pedido) {
        return res.status(404).json({ ok: false, message: 'Pedido no encontrado' });
      }

      res.json({ ok: true, data: pedido });
    } catch (error) {
      console.error('Error al obtener pedido:', error);
      res.status(500).json({ ok: false, message: 'Error al obtener pedido' });
    }
  },

  async crear(req, res) {
    try {
      const {
        id_publicacion,
        id_estado_pedido,
        id_metodo_pago,
        id_tipo_envio,
        id_direccion_envio,
        total
      } = req.body;

      if (!req.user) {
        return res.status(401).json({ ok: false, message: 'No autorizado' });
      }

      if (
        !id_publicacion ||
        !id_estado_pedido ||
        !id_metodo_pago ||
        !id_tipo_envio ||
        !id_direccion_envio ||
        total === undefined
      ) {
        return res.status(400).json({
          ok: false,
          message: 'id_publicacion, id_estado_pedido, id_metodo_pago, id_tipo_envio, id_direccion_envio y total son obligatorios'
        });
      }

      const publicacion = await PublicacionModel.getById(id_publicacion);
      if (!publicacion) {
        return res.status(400).json({
          ok: false,
          message: 'La publicación indicada no existe'
        });
      }

      const nuevo = await PedidoModel.create({
        id_publicacion,
        id_comprador: req.user.id_usuario,
        id_vendedor: publicacion.id_usuario,
        id_estado_pedido,
        id_metodo_pago,
        id_tipo_envio,
        id_direccion_envio,
        total
      });

      res.status(201).json({
        ok: true,
        message: 'Pedido creado correctamente',
        data: nuevo
      });
    } catch (error) {
      console.error('Error al crear pedido:', error);
      res.status(500).json({ ok: false, message: 'Error al crear pedido' });
    }
  },

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const {
        id_estado_pedido,
        id_metodo_pago,
        id_tipo_envio,
        id_direccion_envio,
        total
      } = req.body;

      if (
        !id_estado_pedido ||
        !id_metodo_pago ||
        !id_tipo_envio ||
        !id_direccion_envio ||
        total === undefined
      ) {
        return res.status(400).json({
          ok: false,
          message: 'id_estado_pedido, id_metodo_pago, id_tipo_envio, id_direccion_envio y total son obligatorios'
        });
      }

      const pedido = await PedidoModel.getById(id);
      if (!pedido) {
        return res.status(404).json({ ok: false, message: 'Pedido no encontrado' });
      }

      await PedidoModel.update(id, {
        id_estado_pedido,
        id_metodo_pago,
        id_tipo_envio,
        id_direccion_envio,
        total
      });

      res.json({ ok: true, message: 'Pedido actualizado correctamente' });
    } catch (error) {
      console.error('Error al actualizar pedido:', error);
      res.status(500).json({ ok: false, message: 'Error al actualizar pedido' });
    }
  },

  async eliminar(req, res) {
    try {
      const { id } = req.params;

      const pedido = await PedidoModel.getById(id);
      if (!pedido) {
        return res.status(404).json({ ok: false, message: 'Pedido no encontrado' });
      }

      await PedidoModel.delete(id);

      res.json({ ok: true, message: 'Pedido eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar pedido:', error);
      res.status(500).json({ ok: false, message: 'Error al eliminar pedido' });
    }
  }
};

module.exports = PedidoController;
