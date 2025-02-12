/**
 * @file soporte.model.js
 * @description define el modelo de soporte para Sequelize
 * @module models/soporte
 */

import { DataTypes } from "sequelize";
import sequelize from "../config/database";

/**
 * Define el modelo de soporte utilizando sequelize 
 * 
 */
const Soporte = sequelize.define(
    'Soporte',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        usuario_id: {
            field: 'usuario_id',
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Usuario', // Referencia al modelo Usuario
                key: 'id',
            },
        },
        tipo_soporte:{
            type: DataTypes.ENUM('tecnico', 'administrativo'),
            allowNull: false,
        },
        prioridad:{
            type: DataTypes.ENUM('baja', 'media', 'alta'),
            allowNull: false,
        },
        mensaje:{
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [10, 1000], // Validación de longitud (mínimo 10 caracteres, máximo 1000)
            },
        }, 
        estado: {
            type: DataTypes.ENUM('pendiente', 'resuelto'),
            allowNull: false,
        },
        fecha_resolucion: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }, 
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, 
    {
        tableName: 'soporte', // Nombre de la tabla en la base de datos
        timestamps: false, // Desactiva los timestamps automáticos (createdAt, updatedAt)
    } 
);

// Relaciones
Soporte.associate = (models) => {
    Soporte.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
};

export default Soporte; 