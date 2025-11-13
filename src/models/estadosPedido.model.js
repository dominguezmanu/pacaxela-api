const pool = require('../config/db');

const EstadoPedidoModel = {
  async getAll() {
    const [rows] = await pool.query(
      'SELECT id_estado_pedido, nombre, descripcion FROM estados_pedido'
    );
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query(
      'SELECT id_estado_pedido, nombre, descripcion FROM estados_pedido WHERE id_estado_pedido = ?',
      [id]
    );
    return rows[0] || null;
  },

  async create(data) {
    const { nombre, descripcion } = data;

    const [result] = await pool.query(
      `INSERT INTO estados_pedido (nombre, descripcion)
       VALUES (?, ?)`,
      [nombre, descripcion || null]
    );

    return { id_estado_pedido: result.insertId };
  },

  async update(id, data) {
    const { nombre, descripcion } = data;

    await pool.query(
      `UPDATE estados_pedido
       SET nombre = ?, descripcion = ?
       WHERE id_estado_pedido = ?`,
      [nombre, descripcion || null, id]
    );

    return true;
  },

  async delete(id) {
    await pool.query(
      'DELETE FROM estados_pedido WHERE id_estado_pedido = ?',
      [id]
    );
    return true;
  }
};

module.exports = EstadoPedidoModel;
