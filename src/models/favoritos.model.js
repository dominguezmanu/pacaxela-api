const pool = require('../config/db');

const FavoritoModel = {
  async getAll(filtros = {}) {
    let sql = `
      SELECT 
        id_favorito,
        id_usuario,
        id_publicacion,
        fecha_agregado
      FROM favoritos
      WHERE 1 = 1
    `;
    const params = [];

    if (filtros.id_usuario) {
      sql += ' AND id_usuario = ?';
      params.push(filtros.id_usuario);
    }

    if (filtros.id_publicacion) {
      sql += ' AND id_publicacion = ?';
      params.push(filtros.id_publicacion);
    }

    sql += ' ORDER BY fecha_agregado DESC';

    const [rows] = await pool.query(sql, params);
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query(
      `SELECT 
        id_favorito,
        id_usuario,
        id_publicacion,
        fecha_agregado
       FROM favoritos
       WHERE id_favorito = ?`,
      [id]
    );
    return rows[0] || null;
  },

  async getByUsuarioPublicacion(idUsuario, idPublicacion) {
    const [rows] = await pool.query(
      `SELECT 
        id_favorito,
        id_usuario,
        id_publicacion,
        fecha_agregado
       FROM favoritos
       WHERE id_usuario = ? AND id_publicacion = ?`,
      [idUsuario, idPublicacion]
    );
    return rows[0] || null;
  },

  async create(data) {
    const { id_usuario, id_publicacion } = data;

    const [result] = await pool.query(
      `INSERT INTO favoritos
       (id_usuario, id_publicacion)
       VALUES (?, ?)`,
      [id_usuario, id_publicacion]
    );

    return { id_favorito: result.insertId };
  },

  async delete(id) {
    await pool.query(
      'DELETE FROM favoritos WHERE id_favorito = ?',
      [id]
    );
    return true;
  }
};

module.exports = FavoritoModel;