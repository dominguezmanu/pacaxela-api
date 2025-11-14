const FavoritoModel = require('../models/favoritos.model');

const FavoritoController = {
  async listar(req, res) {
    try {
      const { id_usuario, id_publicacion } = req.query;

      const filtros = {};
      if (id_usuario) filtros.id_usuario = id_usuario;
      if (id_publicacion) filtros.id_publicacion = id_publicacion;

      const favoritos = await FavoritoModel.getAll(filtros);
      res.json({ ok: true, data: favoritos });
    } catch (error) {
      console.error('Error al listar favoritos:', error);
      res.status(500).json({ ok: false, message: 'Error al listar favoritos' });
    }
  },

  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const favorito = await FavoritoModel.getById(id);

      if (!favorito) {
        return res.status(404).json({ ok: false, message: 'Favorito no encontrado' });
      }

      res.json({ ok: true, data: favorito });
    } catch (error) {
      console.error('Error al obtener favorito:', error);
      res.status(500).json({ ok: false, message: 'Error al obtener favorito' });
    }
  },

  async crear(req, res) {
    try {
      const { id_publicacion } = req.body;

      if (!req.user) {
        return res.status(401).json({ ok: false, message: 'No autorizado' });
      }

      if (!id_publicacion) {
        return res.status(400).json({
          ok: false,
          message: 'id_publicacion es obligatorio'
        });
      }
//no tener dos veces el mismo favorito
      const existe = await FavoritoModel.getByUsuarioPublicacion(
        req.user.id_usuario,
        id_publicacion
      );

      if (existe) {
        return res.status(400).json({
          ok: false,
          message: 'Esta publicación ya está en favoritos'
        });
      }

      const nuevo = await FavoritoModel.create({
        id_usuario: req.user.id_usuario,
        id_publicacion
      });

      res.status(201).json({
        ok: true,
        message: 'Favorito agregado correctamente',
        data: nuevo
      });
    } catch (error) {
      console.error('Error al crear favorito:', error);
      res.status(500).json({ ok: false, message: 'Error al crear favorito' });
    }
  },

  async eliminar(req, res) {
    try {
      const { id } = req.params;

      const favorito = await FavoritoModel.getById(id);
      if (!favorito) {
        return res.status(404).json({ ok: false, message: 'Favorito no encontrado' });
      }

      await FavoritoModel.delete(id);

      res.json({ ok: true, message: 'Favorito eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar favorito:', error);
      res.status(500).json({ ok: false, message: 'Error al eliminar favorito' });
    }
  }
};

module.exports = FavoritoController;
