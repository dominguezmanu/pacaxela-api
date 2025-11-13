const pool = require('../config/db');

const PedidoModel = {
  async getAll(filtros = {}) {
    let sql = `
      SELECT 
        id_pedido,
        id_publicacion,
        id_comprador,
        id_vendedor,
        id_estado_pedido,
        id_metodo_pago,
        id_tipo_envio,
        id_direccion_envio,
        total,
        fecha_pedido
      FROM pedidos
      WHERE 1 = 1
    `;
    const params = [];

    if (filtros.id_comprador) {
      sql += ' AND id_comprador = ?';
      params.push(filtros.id_comprador);
    }

    if (filtros.id_vendedor) {
      sql += ' AND id_vendedor = ?';
      params.push(filtros.id_vendedor);
    }

    if (filtros.id_estado_pedido) {
      sql += ' AND id_estado_pedido = ?';
      params.push(filtros.id_estado_pedido);
    }

    sql += ' ORDER BY fecha_pedido DESC';

    const [rows] = await pool.query(sql, params);
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query(
      `SELECT 
        id_pedido,
        id_publicacion,
        id_comprador,
        id_vendedor,
        id_estado_pedido,
        id_metodo_pago,
        id_tipo_envio,
        id_direccion_envio,
        total,
        fecha_pedido
       FROM pedidos
       WHERE id_pedido = ?`,
      [id]
    );
    return rows[0] || null;
  },

  async create(data) {
    const {
      id_publicacion,
      id_comprador,
      id_vendedor,
      id_estado_pedido,
      id_metodo_pago,
      id_tipo_envio,
      id_direccion_envio,
      total
    } = data;

    const [result] = await pool.query(
      `INSERT INTO pedidos
       (id_publicacion, id_comprador, id_vendedor,
        id_estado_pedido, id_metodo_pago, id_tipo_envio,
        id_direccion_envio, total)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id_publicacion,
        id_comprador,
        id_vendedor,
        id_estado_pedido,
        id_metodo_pago,
        id_tipo_envio,
        id_direccion_envio,
        total
      ]
    );

    return { id_pedido: result.insertId };
  },

  async update(id, data) {
    const {
      id_estado_pedido,
      id_metodo_pago,
      id_tipo_envio,
      id_direccion_envio,
      total
    } = data;

    await pool.query(
      `UPDATE pedidos
       SET id_estado_pedido = ?,
           id_metodo_pago = ?,
           id_tipo_envio = ?,
           id_direccion_envio = ?,
           total = ?
       WHERE id_pedido = ?`,
      [
        id_estado_pedido,
        id_metodo_pago,
        id_tipo_envio,
        id_direccion_envio,
        total,
        id
      ]
    );

    return true;
  },

  async delete(id) {
    await pool.query(
      'DELETE FROM pedidos WHERE id_pedido = ?',
      [id]
    );
    return true;
  }
};

module.exports = PedidoModel;
