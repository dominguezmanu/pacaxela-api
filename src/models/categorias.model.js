// src/models/categorias.model.js
const pool = require('../config/db');

const CategoriaModel = {
  // Obtener todas las categorías
  async getAll() {
    const [rows] = await pool.query(
      'SELECT id_categoria, nombre, descripcion FROM categorias_prenda'
    );
    return rows;
  },

  // Obtener una categoría por ID
  async getById(id) {
    const [rows] = await pool.query(
      'SELECT id_categoria, nombre, descripcion FROM categorias_prenda WHERE id_categoria = ?',
      [id]
    );
    return rows[0] || null;
  },

  // Crear categoría
  async create(data) {
    const { nombre, descripcion } = data;

    const [result] = await pool.query(
      `INSERT INTO categorias_prenda (nombre, descripcion)
       VALUES (?, ?)`,
      [nombre, descripcion || null]
    );

    return { id_categoria: result.insertId };
  },

  // Actualizar categoría
  async update(id, data) {
    const { nombre, descripcion } = data;

    await pool.query(
      `UPDATE categorias_prenda
       SET nombre = ?, descripcion = ?
       WHERE id_categoria = ?`,
      [nombre, descripcion || null, id]
    );

    return true;
  },

  // Eliminar categoría
  async delete(id) {
    await pool.query(
      'DELETE FROM categorias_prenda WHERE id_categoria = ?',
      [id]
    );
    return true;
  }
};

module.exports = CategoriaModel;
