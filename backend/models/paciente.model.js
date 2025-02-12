/**
 * @file paciente.model.js
 * @description define el modelo de paciente para Sequelize
 * @module models/pacientes
 */

import { DataTypes } from "sequelize";
import sequelize from "../config/database";

/**
 * Define el modelo de Paciente utilizando sequelize 
 * 
 */
const Pacientes = sequelize.define(
    'Pacientes',
    {
      id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      }, 
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
      }, 
      rut: {
        type: DataTypes.STRING(12),
        allowNull: false,
        unique: true,
        validate: {
            is: /^[0-9]+[-|‐]{1}[0-9kK]{1}$/, // Validación de formato de RUT chileno
        },
      },
      fecha_nacimiento:{
        type:DataTypes.DATE,
        allowNull:false,
      },
      telefono: {
        type: DataTypes.STRING(15),
      },
      direccion: {
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
        tableName: 'pacientes', // Nombre de la tabla en la base de datos
        timestamps: false, // Desactiva los timestamps automáticos (createdAt, updatedAt)
      }
);

// Relaciones
Pacientes.associate = (models) => {
    Pacientes.hasMany(models.Derivacion, { foreignKey: 'pacienteId' });
  };

  export default Pacientes; 
