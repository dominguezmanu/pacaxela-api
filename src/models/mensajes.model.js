const pool = require('../config/db');

const MensajeModel = {
  async getAll(filtros = {}) {
    let sql = `
      SELECT 
        id_mensaje,
        id_remitente,
        id_destinatario,
        contenido,
        fecha_envio,
        leido
      FROM mensajes
      WHERE 1 = 1
    `;
    const params = [];

    if (filtros.id_remitente) {
      sql += ' AND id_remitente = ?';
      params.push(filtros.id_remitente);
    }

    if (filtros.id_destinatario) {
      sql += ' AND id_destinatario = ?';
      params.push(filtros.id_destinatario);
    }

    sql += ' ORDER BY fecha_envio DESC';

    const [rows] = await pool.query(sql, params);
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query(
      `SELECT 
        id_mensaje,
        id_remitente,
        id_destinatario,
        contenido,
        fecha_envio,
        leido
       FROM mensajes
       WHERE id_mensaje = ?`,
      [id]
    );
    return rows[0] || null;
  },

  async create(data) {
    const { id_remitente, id_destinatario, contenido } = data;

    const [result] = await pool.query(
      `INSERT INTO mensajes
       (id_remitente, id_destinatario, contenido, leido)
       VALUES (?, ?, ?, 0)`,
      [id_remitente, id_destinatario, contenido]
    );

    return { id_mensaje: result.insertId };
  },

  async update(id, data) {
    const { contenido, leido } = data;

    await pool.query(
      `UPDATE mensajes
       SET contenido = ?, leido = ?
       WHERE id_mensaje = ?`,
      [contenido || null, leido ? 1 : 0, id]
    );

    return true;
  },

  async marcarLeido(id) {
    await pool.query(
      `UPDATE mensajes
       SET leido = 1
       WHERE id_mensaje = ?`,
      [id]
    );
    return true;
  },

  async delete(id) {
    await pool.query(
      'DELETE FROM mensajes WHERE id_mensaje = ?',
      [id]
    );
    return true;
  }
};

module.exports = MensajeModel;
