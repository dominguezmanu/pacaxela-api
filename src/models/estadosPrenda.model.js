const pool = require('../config/db');

const EstadoPrendaModel = {
  
  async getAll() {
    const [rows] = await pool.query(
      'SELECT id_estado_prenda, nombre, descripcion FROM estados_prenda'
    );
    return rows;
  },

  
  async getById(id) {
    const [rows] = await pool.query(
      'SELECT id_estado_prenda, nombre, descripcion FROM estados_prenda WHERE id_estado_prenda = ?',
      [id]
    );
    return rows[0] || null;
  },

  async create(data) {
    const { nombre, descripcion } = data;

    const [result] = await pool.query(
      `INSERT INTO estados_prenda (nombre, descripcion)
       VALUES (?, ?)`,
      [nombre, descripcion || null]
    );

    return { id_estado_prenda: result.insertId };
  },


  

  async update(id, data) {
    const { nombre, descripcion } = data;

    await pool.query(
      `UPDATE estados_prenda
       SET nombre = ?, descripcion = ?
       WHERE id_estado_prenda = ?`,
      [nombre, descripcion || null, id]
    );

    return true;
  },

  async delete(id) {
    await pool.query(
      'DELETE FROM estados_prenda WHERE id_estado_prenda = ?',
      [id]
    );
    return true;
  }
};

module.exports = EstadoPrendaModel;
