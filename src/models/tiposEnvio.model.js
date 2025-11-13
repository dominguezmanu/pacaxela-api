// src/models/tiposEnvio.model.js
const pool = require('../config/db');

const TipoEnvioModel = {
  async getAll() {
    const [rows] = await pool.query(
      'SELECT id_tipo_envio, nombre, descripcion, costo_base FROM tipos_envio'
    );
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query(
      'SELECT id_tipo_envio, nombre, descripcion, costo_base FROM tipos_envio WHERE id_tipo_envio = ?',
      [id]
    );
    return rows[0] || null;
  },

  async create(data) {
    const { nombre, descripcion, costo_base } = data;

    const [result] = await pool.query(
      `INSERT INTO tipos_envio (nombre, descripcion, costo_base)
       VALUES (?, ?, ?)`,
      [nombre, descripcion || null, costo_base ?? 0]
    );

    return { id_tipo_envio: result.insertId };
  },

  async update(id, data) {
    const { nombre, descripcion, costo_base } = data;

    await pool.query(
      `UPDATE tipos_envio
       SET nombre = ?, descripcion = ?, costo_base = ?
       WHERE id_tipo_envio = ?`,
      [nombre, descripcion || null, costo_base ?? 0, id]
    );

    return true;
  },

  async delete(id) {
    await pool.query(
      'DELETE FROM tipos_envio WHERE id_tipo_envio = ?',
      [id]
    );
    return true;
  }
};

module.exports = TipoEnvioModel;
