// src/models/publicaciones.model.js
const pool = require('../config/db');

const PublicacionModel = {
  async getAll(filtros = {}) {
    let sql = `
      SELECT 
        id_publicacion,
        id_usuario,
        titulo,
        descripcion,
        precio,
        id_categoria,
        id_talla,
        id_estado_prenda,
        fecha_publicacion,
        disponible
      FROM publicaciones
      WHERE 1 = 1
    `;
    const params = [];

    if (filtros.id_usuario) {
      sql += ' AND id_usuario = ?';
      params.push(filtros.id_usuario);
    }

    if (filtros.disponible !== undefined) {
      sql += ' AND disponible = ?';
      params.push(filtros.disponible ? 1 : 0);
    }

    sql += ' ORDER BY fecha_publicacion DESC';

    const [rows] = await pool.query(sql, params);
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query(
      `SELECT 
        id_publicacion,
        id_usuario,
        titulo,
        descripcion,
        precio,
        id_categoria,
        id_talla,
        id_estado_prenda,
        fecha_publicacion,
        disponible
       FROM publicaciones
       WHERE id_publicacion = ?`,
      [id]
    );
    return rows[0] || null;
  },

  async create(data) {
    const {
      id_usuario,
      titulo,
      descripcion,
      precio,
      id_categoria,
      id_talla,
      id_estado_prenda,
      disponible
    } = data;

    const [result] = await pool.query(
      `INSERT INTO publicaciones
       (id_usuario, titulo, descripcion, precio, id_categoria, id_talla, id_estado_prenda, disponible)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id_usuario,
        titulo,
        descripcion || null,
        precio,
        id_categoria,
        id_talla,
        id_estado_prenda,
        disponible ? 1 : 1
      ]
    );

    return { id_publicacion: result.insertId };
  },

  async update(id, data) {
    const {
      titulo,
      descripcion,
      precio,
      id_categoria,
      id_talla,
      id_estado_prenda,
      disponible
    } = data;

    await pool.query(
      `UPDATE publicaciones
       SET titulo = ?, descripcion = ?, precio = ?,
           id_categoria = ?, id_talla = ?, id_estado_prenda = ?, disponible = ?
       WHERE id_publicacion = ?`,
      [
        titulo,
        descripcion || null,
        precio,
        id_categoria,
        id_talla,
        id_estado_prenda,
        disponible ? 1 : 0,
        id
      ]
    );

    return true;
  },

  async delete(id) {
    await pool.query(
      'DELETE FROM publicaciones WHERE id_publicacion = ?',
      [id]
    );
    return true;
  }
};

module.exports = PublicacionModel;
