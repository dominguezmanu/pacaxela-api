const MensajeModel = require('../models/mensajes.model');

const MensajeController = {
  async listar(req, res) {
    try {
      const { id_remitente, id_destinatario } = req.query;

      const filtros = {};
      if (id_remitente) filtros.id_remitente = id_remitente;
      if (id_destinatario) filtros.id_destinatario = id_destinatario;

      const mensajes = await MensajeModel.getAll(filtros);
      res.json({ ok: true, data: mensajes });
    } catch (error) {
      console.error('Error al listar mensajes:', error);
      res.status(500).json({ ok: false, message: 'Error al listar mensajes' });
    }
  },

  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const mensaje = await MensajeModel.getById(id);

      if (!mensaje) {
        return res.status(404).json({ ok: false, message: 'Mensaje no encontrado' });
      }

      res.json({ ok: true, data: mensaje });
    } catch (error) {
      console.error('Error al obtener mensaje:', error);
      res.status(500).json({ ok: false, message: 'Error al obtener mensaje' });
    }
  },

  async crear(req, res) {
    try {
      const { id_destinatario, contenido } = req.body;

      if (!req.user) {
        return res.status(401).json({ ok: false, message: 'No autorizado' });
      }

      if (!id_destinatario || !contenido) {
        return res.status(400).json({
          ok: false,
          message: 'id_destinatario y contenido son obligatorios'
        });
      }

      const nueva = await MensajeModel.create({
        id_remitente: req.user.id_usuario,
        id_destinatario,
        contenido
      });

      res.status(201).json({
        ok: true,
        message: 'Mensaje enviado correctamente',
        data: nueva
      });
    } catch (error) {
      console.error('Error al crear mensaje:', error);
      res.status(500).json({ ok: false, message: 'Error al crear mensaje' });
    }
  },

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { contenido, leido } = req.body;

      const mensaje = await MensajeModel.getById(id);
      if (!mensaje) {
        return res.status(404).json({ ok: false, message: 'Mensaje no encontrado' });
      }

      if (contenido === undefined && leido === undefined) {
        return res.status(400).json({
          ok: false,
          message: 'Debe enviar al menos contenido o leido para actualizar'
        });
      }

      await MensajeModel.update(id, {
        contenido: contenido !== undefined ? contenido : mensaje.contenido,
        leido: leido !== undefined ? leido : mensaje.leido
      });

      res.json({ ok: true, message: 'Mensaje actualizado correctamente' });
    } catch (error) {
      console.error('Error al actualizar mensaje:', error);
      res.status(500).json({ ok: false, message: 'Error al actualizar mensaje' });
    }
  },

  async marcarLeido(req, res) {
    try {
      const { id } = req.params;

      const mensaje = await MensajeModel.getById(id);
      if (!mensaje) {
        return res.status(404).json({ ok: false, message: 'Mensaje no encontrado' });
      }

      await MensajeModel.marcarLeido(id);

      res.json({ ok: true, message: 'Mensaje marcado como leído' });
    } catch (error) {
      console.error('Error al marcar mensaje como leído:', error);
      res.status(500).json({ ok: false, message: 'Error al marcar mensaje como leído' });
    }
  },

  async eliminar(req, res) {
    try {
      const { id } = req.params;

      const mensaje = await MensajeModel.getById(id);
      if (!mensaje) {
        return res.status(404).json({ ok: false, message: 'Mensaje no encontrado' });
      }

      await MensajeModel.delete(id);

      res.json({ ok: true, message: 'Mensaje eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar mensaje:', error);
      res.status(500).json({ ok: false, message: 'Error al eliminar mensaje' });
    }
  }
};

module.exports = MensajeController;
