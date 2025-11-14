const pool = require('../config/db');

const RolModel = {
  async getAll() {
    const [rows] = await pool.query(
      'SELECT id_rol, nombre FROM roles'
    );
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query(
      'SELECT id_rol, nombre FROM roles WHERE id_rol = ?',
      [id]
    );
    return rows[0] || null;
  },

  async create(data) {
    const { nombre } = data;

    const [result] = await pool.query(
      `INSERT INTO roles (nombre)
       VALUES (?)`,
      [nombre || null]
    );

    return { id_rol: result.insertId };
  },

  async update(id, data) {
    const { nombre } = data;

    await pool.query(
      `UPDATE roles
       SET nombre = ?
       WHERE id_rol = ?`,
      [nombre|| null, id]
    );

    return true;
  },

  async delete(id) {
    await pool.query(
      'DELETE FROM roles WHERE id_rol = ?',
      [id]
    );
    return true;
  }
};

module.exports = RolModel;
