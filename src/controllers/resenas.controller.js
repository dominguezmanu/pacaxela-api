const ResenaModel = require('../models/resenas.model');
const PedidoModel = require('../models/pedidos.model');

const ResenaController = {
  async listar(req, res) {
    try {
      const { id_pedido, id_usuario } = req.query;

      const filtros = {};
      if (id_pedido) filtros.id_pedido = id_pedido;
      if (id_usuario) filtros.id_usuario = id_usuario;

      const resenas = await ResenaModel.getAll(filtros);
      res.json({ ok: true, data: resenas });
    } catch (error) {
      console.error('Error al listar reseñas:', error);
      res.status(500).json({ ok: false, message: 'Error al listar reseñas' });
    }
  },

  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const resena = await ResenaModel.getById(id);

      if (!resena) {
        return res.status(404).json({ ok: false, message: 'Reseña no encontrada' });
      }

      res.json({ ok: true, data: resena });
    } catch (error) {
      console.error('Error al obtener reseña:', error);
      res.status(500).json({ ok: false, message: 'Error al obtener reseña' });
    }
  },

  async crear(req, res) {
    try {
      const { id_pedido, comentario, calificacion } = req.body;

      if (!req.user) {
        return res.status(401).json({ ok: false, message: 'No autorizado' });
      }

      if (!id_pedido || calificacion === undefined) {
        return res.status(400).json({
          ok: false,
          message: 'id_pedido y calificacion son obligatorios'
        });
      }

      if (calificacion < 1 || calificacion > 5) {
        return res.status(400).json({
          ok: false,
          message: 'La calificación debe estar entre 1 y 5'
        });
      }

      const pedido = await PedidoModel.getById(id_pedido);
      if (!pedido) {
        return res.status(400).json({
          ok: false,
          message: 'El pedido indicado no existe'
        });
      }

      const nueva = await ResenaModel.create({
        id_pedido,
        id_usuario: req.user.id_usuario,
        comentario,
        calificacion
      });

      res.status(201).json({
        ok: true,
        message: 'Reseña creada correctamente',
        data: nueva
      });
    } catch (error) {
      console.error('Error al crear reseña:', error);
      res.status(500).json({ ok: false, message: 'Error al crear reseña' });
    }
  },

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { comentario, calificacion } = req.body;

      if (calificacion === undefined) {
        return res.status(400).json({
          ok: false,
          message: 'calificacion es obligatoria'
        });
      }

      if (calificacion < 1 || calificacion > 5) {
        return res.status(400).json({
          ok: false,
          message: 'La calificación debe estar entre 1 y 5'
        });
      }

      const resena = await ResenaModel.getById(id);
      if (!resena) {
        return res.status(404).json({ ok: false, message: 'Reseña no encontrada' });
      }

      await ResenaModel.update(id, { comentario, calificacion });

      res.json({ ok: true, message: 'Reseña actualizada correctamente' });
    } catch (error) {
      console.error('Error al actualizar reseña:', error);
      res.status(500).json({ ok: false, message: 'Error al actualizar reseña' });
    }
  },

  async eliminar(req, res) {
    try {
      const { id } = req.params;

      const resena = await ResenaModel.getById(id);
      if (!resena) {
        return res.status(404).json({ ok: false, message: 'Reseña no encontrada' });
      }

      await ResenaModel.delete(id);

      res.json({ ok: true, message: 'Reseña eliminada correctamente' });
    } catch (error) {
      console.error('Error al eliminar reseña:', error);
      res.status(500).json({ ok: false, message: 'Error al eliminar reseña' });
    }
  }
};

module.exports = ResenaController;
