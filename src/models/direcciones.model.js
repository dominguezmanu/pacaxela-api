// src/models/direcciones.model.js
const pool = require('../config/db');

const DireccionModel = {
  async getAll() {
    const [rows] = await pool.query(
      `SELECT id_direccion, id_usuario, titulo, direccion_completa,
              ciudad, departamento, referencia, es_principal
       FROM direcciones_usuario`
    );
    return rows;
  },

  async getByUsuario(idUsuario) {
    const [rows] = await pool.query(
      `SELECT id_direccion, id_usuario, titulo, direccion_completa,
              ciudad, departamento, referencia, es_principal
       FROM direcciones_usuario
       WHERE id_usuario = ?`,
      [idUsuario]
    );
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query(
      `SELECT id_direccion, id_usuario, titulo, direccion_completa,
              ciudad, departamento, referencia, es_principal
       FROM direcciones_usuario
       WHERE id_direccion = ?`,
      [id]
    );
    return rows[0] || null;
  },

  async create(data) {
    const {
      id_usuario,
      titulo,
      direccion_completa,
      ciudad,
      departamento,
      referencia,
      es_principal
    } = data;

    const [result] = await pool.query(
      `INSERT INTO direcciones_usuario
       (id_usuario, titulo, direccion_completa, ciudad, departamento, referencia, es_principal)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id_usuario,
        titulo,
        direccion_completa,
        ciudad,
        departamento,
        referencia || null,
        es_principal ? 1 : 0
      ]
    );

    return { id_direccion: result.insertId };
  },

  async update(id, data) {
    const {
      id_usuario,
      titulo,
      direccion_completa,
      ciudad,
      departamento,
      referencia,
      es_principal
    } = data;

    await pool.query(
      `UPDATE direcciones_usuario
       SET id_usuario = ?, titulo = ?, direccion_completa = ?,
           ciudad = ?, departamento = ?, referencia = ?, es_principal = ?
       WHERE id_direccion = ?`,
      [
        id_usuario,
        titulo,
        direccion_completa,
        ciudad,
        departamento,
        referencia || null,
        es_principal ? 1 : 0,
        id
      ]
    );

    return true;
  },

  async delete(id) {
    await pool.query(
      'DELETE FROM direcciones_usuario WHERE id_direccion = ?',
      [id]
    );
    return true;
  }
};

module.exports = DireccionModel;
