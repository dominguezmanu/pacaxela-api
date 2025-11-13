// src/models/tallas.model.js
const pool = require('../config/db');

const TallaModel = {
  //  todas las tallas
  async getAll() {
    const [rows] = await pool.query(
      'SELECT id_talla, nombre, descripcion FROM tallas'
    );
    return rows;
  },

  //  talla por ID
  async getById(id) {
    const [rows] = await pool.query(
      'SELECT id_talla, nombre, descripcion FROM tallas WHERE id_talla = ?',
      [id]
    );
    return rows[0] || null;
  },

  // Crear talla
  async create(data) {
    const { nombre, descripcion } = data;

    const [result] = await pool.query(
      `INSERT INTO tallas (nombre, descripcion)
       VALUES (?, ?)`,
      [nombre, descripcion || null]
    );

    return { id_talla: result.insertId };
  },

  // Actualizar talla
  async update(id, data) {
    const { nombre, descripcion } = data;

    await pool.query(
      `UPDATE tallas
       SET nombre = ?, descripcion = ?
       WHERE id_talla = ?`,
      [nombre, descripcion || null, id]
    );

    return true;
  },

  // Eliminar talla
  async delete(id) {
    await pool.query(
      'DELETE FROM tallas WHERE id_talla = ?',
      [id]
    );
    return true;
  }
};

module.exports = TallaModel;
