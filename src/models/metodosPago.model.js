// src/models/metodosPago.model.js
const pool = require('../config/db');

const MetodoPagoModel = {
  async getAll() {
    const [rows] = await pool.query(
      'SELECT id_metodo_pago, nombre, descripcion FROM metodos_pago'
    );
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query(
      'SELECT id_metodo_pago, nombre, descripcion FROM metodos_pago WHERE id_metodo_pago = ?',
      [id]
    );
    return rows[0] || null;
  },

  async create(data) {
    const { nombre, descripcion } = data;

    const [result] = await pool.query(
      `INSERT INTO metodos_pago (nombre, descripcion)
       VALUES (?, ?)`,
      [nombre, descripcion || null]
    );

    return { id_metodo_pago: result.insertId };
  },

  async update(id, data) {
    const { nombre, descripcion } = data;

    await pool.query(
      `UPDATE metodos_pago
       SET nombre = ?, descripcion = ?
       WHERE id_metodo_pago = ?`,
      [nombre, descripcion || null, id]
    );

    return true;
  },

  async delete(id) {
    await pool.query(
      'DELETE FROM metodos_pago WHERE id_metodo_pago = ?',
      [id]
    );
    return true;
  }
};

module.exports = MetodoPagoModel;
