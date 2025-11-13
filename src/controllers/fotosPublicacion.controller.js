const FotoPublicacionModel = require('../models/fotosPublicacion.model');

const FotoPublicacionController = {
  async listar(req, res) {
    try {
      const { id_publicacion } = req.query;

      const filtros = {};
      if (id_publicacion) {
        filtros.id_publicacion = id_publicacion;
      }

      const fotos = await FotoPublicacionModel.getAll(filtros);
      res.json({ ok: true, data: fotos });
    } catch (error) {
      console.error('Error al listar fotos de publicación:', error);
      res.status(500).json({ ok: false, message: 'Error al listar fotos de publicación' });
    }
  },

  
  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const foto = await FotoPublicacionModel.getById(id);

      if (!foto) {
        return res.status(404).json({ ok: false, message: 'Foto no encontrada' });
      }

      res.json({ ok: true, data: foto });
    } catch (error) {
      console.error('Error al obtener foto de publicación:', error);
      res.status(500).json({ ok: false, message: 'Error al obtener foto de publicación' });
    }
  },

  
  async crear(req, res) {
    try {
      const { id_publicacion, url_imagen, es_principal } = req.body;

      if (!id_publicacion || !url_imagen) {
        return res.status(400).json({
          ok: false,
          message: 'id_publicacion y url_imagen son obligatorios'
        });
      }

      const nueva = await FotoPublicacionModel.create({
        id_publicacion,
        url_imagen,
        es_principal
      });

      res.status(201).json({
        ok: true,
        message: 'Foto de publicación creada correctamente',
        data: nueva
      });
    } catch (error) {
      console.error('Error al crear foto de publicación:', error);
      res.status(500).json({ ok: false, message: 'Error al crear foto de publicación' });
    }
  },

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { id_publicacion, url_imagen, es_principal } = req.body;

      if (!id_publicacion || !url_imagen) {
        return res.status(400).json({
          ok: false,
          message: 'id_publicacion y url_imagen son obligatorios'
        });
      }

      const foto = await FotoPublicacionModel.getById(id);
      if (!foto) {
        return res.status(404).json({ ok: false, message: 'Foto no encontrada' });
      }

      await FotoPublicacionModel.update(id, {
        id_publicacion,
        url_imagen,
        es_principal
      });

      res.json({ ok: true, message: 'Foto de publicación actualizada correctamente' });
    } catch (error) {
      console.error('Error al actualizar foto de publicación:', error);
      res.status(500).json({ ok: false, message: 'Error al actualizar foto de publicación' });
    }
  },

  async eliminar(req, res) {
    try {
      const { id } = req.params;

      const foto = await FotoPublicacionModel.getById(id);
      if (!foto) {
        return res.status(404).json({ ok: false, message: 'Foto no encontrada' });
      }

      await FotoPublicacionModel.delete(id);

      res.json({ ok: true, message: 'Foto de publicación eliminada correctamente' });
    } catch (error) {
      console.error('Error al eliminar foto de publicación:', error);
      res.status(500).json({ ok: false, message: 'Error al eliminar foto de publicación' });
    }
  }
};

module.exports = FotoPublicacionController;
