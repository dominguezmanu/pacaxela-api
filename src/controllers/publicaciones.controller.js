const PublicacionModel = require('../models/publicaciones.model');

const PublicacionController = {
  async listar(req, res) {
    try {
      const { id_usuario, disponible } = req.query;

      const filtros = {};
      if (id_usuario) {
        filtros.id_usuario = id_usuario;
      }
      if (disponible !== undefined) {
        filtros.disponible = disponible === '1' || disponible === 'true';
      }

      const publicaciones = await PublicacionModel.getAll(filtros);
      res.json({ ok: true, data: publicaciones });
    } catch (error) {
      console.error('Error al listar publicaciones:', error);
      res.status(500).json({ ok: false, message: 'Error al listar publicaciones' });
    }
  },

  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const publicacion = await PublicacionModel.getById(id);

      if (!publicacion) {
        return res.status(404).json({ ok: false, message: 'Publicación no encontrada' });
      }

      res.json({ ok: true, data: publicacion });
    } catch (error) {
      console.error('Error al obtener publicación:', error);
      res.status(500).json({ ok: false, message: 'Error al obtener publicación' });
    }
  },


  async crear(req, res) {
    try {
      const {
        titulo,
        descripcion,
        precio,
        id_categoria,
        id_talla,
        id_estado_prenda,
        disponible
      } = req.body;

      if (!req.user) {
        return res.status(401).json({ ok: false, message: 'No autorizado' });
      }

      if (!titulo || !precio || !id_categoria || !id_talla || !id_estado_prenda) {
        return res.status(400).json({
          ok: false,
          message: 'titulo, precio, id_categoria, id_talla e id_estado_prenda son obligatorios'
        });
      }

      const nueva = await PublicacionModel.create({
        id_usuario: req.user.id_usuario, 
        titulo,
        descripcion,
        precio,
        id_categoria,
        id_talla,
        id_estado_prenda,
        disponible: disponible !== undefined ? disponible : 1
      });

      res.status(201).json({
        ok: true,
        message: 'Publicación creada correctamente',
        data: nueva
      });
    } catch (error) {
      console.error('Error al crear publicación:', error);
      res.status(500).json({ ok: false, message: 'Error al crear publicación' });
    }
  },

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const {
        titulo,
        descripcion,
        precio,
        id_categoria,
        id_talla,
        id_estado_prenda,
        disponible
      } = req.body;

      if (!titulo || !precio || !id_categoria || !id_talla || !id_estado_prenda) {
        return res.status(400).json({
          ok: false,
          message: 'titulo, precio, id_categoria, id_talla e id_estado_prenda son obligatorios'
        });
      }

      const publicacion = await PublicacionModel.getById(id);
      if (!publicacion) {
        return res.status(404).json({ ok: false, message: 'Publicación no encontrada' });
      }

      await PublicacionModel.update(id, {
        titulo,
        descripcion,
        precio,
        id_categoria,
        id_talla,
        id_estado_prenda,
        disponible: disponible !== undefined ? disponible : publicacion.disponible
      });

      res.json({ ok: true, message: 'Publicación actualizada correctamente' });
    } catch (error) {
      console.error('Error al actualizar publicación:', error);
      res.status(500).json({ ok: false, message: 'Error al actualizar publicación' });
    }
  },

  async eliminar(req, res) {
    try {
      const { id } = req.params;

      const publicacion = await PublicacionModel.getById(id);
      if (!publicacion) {
        return res.status(404).json({ ok: false, message: 'Publicación no encontrada' });
      }

      await PublicacionModel.delete(id);

      res.json({ ok: true, message: 'Publicación eliminada correctamente' });
    } catch (error) {
      console.error('Error al eliminar publicación:', error);
      res.status(500).json({ ok: false, message: 'Error al eliminar publicación' });
    }
  }
};

module.exports = PublicacionController;
