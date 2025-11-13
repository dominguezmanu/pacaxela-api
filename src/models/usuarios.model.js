// src/models/usuarios.model.js
const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const UsuarioModel = {
  // Obtener todos los usuarios
  async getAll() {
    const [rows] = await pool.query(
      'SELECT id_usuario, nombre, email, telefono, fecha_registro, id_rol, estado FROM usuarios'
    );
    return rows;
  },

  // Obtener usuario por ID 
  async getById(id) {
    const [rows] = await pool.query(
      'SELECT id_usuario, nombre, email, telefono, fecha_registro, id_rol, estado FROM usuarios WHERE id_usuario = ?',
      [id]
    );
    return rows[0] || null;
  },

  // obtener usuario por email 
  async getByEmail(email) {
    const [rows] = await pool.query(
      'SELECT * FROM usuarios WHERE email = ? LIMIT 1',
      [email]
    );
    return rows[0] || null;
  },

  // Crear usuario 
  async create(data) {
    const { nombre, email, password, telefono, id_rol } = data;

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const [result] = await pool.query(
      `INSERT INTO usuarios (nombre, email, password_hash, telefono, id_rol, estado)
       VALUES (?, ?, ?, ?, ?, 'activo')`,
      [nombre, email, password_hash, telefono || null, id_rol]
    );

    return { id_usuario: result.insertId };
  },

  // Actualizar usuario 
  async update(id, data) {
    const { nombre, email, telefono, id_rol, estado } = data;

    await pool.query(
      `UPDATE usuarios
       SET nombre = ?, email = ?, telefono = ?, id_rol = ?, estado = ?
       WHERE id_usuario = ?`,
      [nombre, email, telefono || null, id_rol, estado, id]
    );

    return true;
  },

  // Eliminar usuario
  async delete(id) {
    await pool.query(
      'DELETE FROM usuarios WHERE id_usuario = ?',
      [id]
    );
    return true;
  }
};

module.exports = UsuarioModel;
