const pool = require('../config/db');

const FotoPublicacionModel = {
  async getAll(filtros = {}) {
    let sql = `
      SELECT 
        id_foto,
        id_publicacion,
        url_imagen,
        es_principal
      FROM fotos_publicacion
      WHERE 1 = 1
    `;
    const params = [];

    if (filtros.id_publicacion) {
      sql += ' AND id_publicacion = ?';
      params.push(filtros.id_publicacion);
    }

    const [rows] = await pool.query(sql, params);
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query(
      `SELECT 
        id_foto,
        id_publicacion,
        url_imagen,
        es_principal
       FROM fotos_publicacion
       WHERE id_foto = ?`,
      [id]
    );
    return rows[0] || null;
  },

  
  async create(data) {
    const { id_publicacion, url_imagen, es_principal } = data;

    const [result] = await pool.query(
      `INSERT INTO fotos_publicacion (id_publicacion, url_imagen, es_principal)
       VALUES (?, ?, ?)`,
      [id_publicacion, url_imagen, es_principal ? 1 : 0]
    );

    return { id_foto: result.insertId };
  },

  
  async update(id, data) {
    const { id_publicacion, url_imagen, es_principal } = data;

    await pool.query(
      `UPDATE fotos_publicacion
       SET id_publicacion = ?, url_imagen = ?, es_principal = ?
       WHERE id_foto = ?`,
      [id_publicacion, url_imagen, es_principal ? 1 : 0, id]
    );

    return true;
  },

  async delete(id) {
    await pool.query(
      'DELETE FROM fotos_publicacion WHERE id_foto = ?',
      [id]
    );
    return true;
  }
};

module.exports = FotoPublicacionModel;
