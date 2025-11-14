const pool = require('../config/db');

const ResenaModel = {
  async getAll(filtros = {}) {
    let sql = `
      SELECT 
        id_resena,
        id_pedido,
        id_usuario,
        comentario,
        calificacion,
        fecha_resena
      FROM \`reseñas\`
      WHERE 1 = 1
    `;
    const params = [];

    if (filtros.id_pedido) {
      sql += ' AND id_pedido = ?';
      params.push(filtros.id_pedido);
    }

    if (filtros.id_usuario) {
      sql += ' AND id_usuario = ?';
      params.push(filtros.id_usuario);
    }

    sql += ' ORDER BY fecha_resena DESC';

    const [rows] = await pool.query(sql, params);
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query(
      `SELECT 
        id_resena,
        id_pedido,
        id_usuario,
        comentario,
        calificacion,
        fecha_resena
       FROM \`reseñas\`
       WHERE id_resena = ?`,
      [id]
    );
    return rows[0] || null;
  },

  
  async create(data) {
    const { id_pedido, id_usuario, comentario, calificacion } = data;

    const [result] = await pool.query(
      `INSERT INTO \`reseñas\`
       (id_pedido, id_usuario, comentario, calificacion)
       VALUES (?, ?, ?, ?)`,
      [id_pedido, id_usuario, comentario || null, calificacion]
    );

    return { id_resena: result.insertId };
  },

  
  async update(id, data) {
    const { comentario, calificacion } = data;

    await pool.query(
      `UPDATE \`reseñas\`
       SET comentario = ?, calificacion = ?
       WHERE id_resena = ?`,
      [comentario || null, calificacion, id]
    );

    return true;
  },

  async delete(id) {
    await pool.query(
      'DELETE FROM `reseñas` WHERE id_resena = ?',
      [id]
    );
    return true;
  }
};

module.exports = ResenaModel;
