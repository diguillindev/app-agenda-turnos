/**
 * @file usuario.model.js
 * @description Define el modelo de Usuario para Sequelize.
 * @module models/usuario
 */

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Importa la conexión a la base de datos

/**
 * Modelo de Usuario.
 * Representa la tabla `usuarios` en la base de datos.
 * @typedef {Object} UsuarioModel
 * @property {number} id - Identificador único del usuario (clave primaria).
 * @property {string} nombre - Nombre del usuario (longitud máxima: 100 caracteres, no nulo).
 * @property {string} email - Correo electrónico del usuario (único, no nulo).
 * @property {string} password - Contraseña del usuario (longitud máxima: 255 caracteres, no nula).
 * @property {'admin'|'usuario'|'medico'|'enfermero'} rol - Rol del usuario (enum, no nulo).
 * @property {string} telefono - Teléfono del usuario (opcional, longitud máxima: 15 caracteres).
 * @property {boolean} activo - Estado del usuario (activo/inactivo, por defecto: true).
 * @property {Date} created_at - Fecha de creación del usuario (por defecto: fecha actual).
 */

/**
 * Define el modelo de Usuario utilizando Sequelize.
 * @type 
 */
const Usuario = sequelize.define(
  'Usuario',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM('admin', 'usuario', 'medico', 'enfermero'),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(15),
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'usuarios', // Nombre de la tabla en la base de datos
    timestamps: false, // Desactiva los timestamps automáticos (createdAt, updatedAt)
  }
);

export default Usuario;