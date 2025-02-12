/**
 * @file notificaciones.model.js
 * @description define el modelo de notificaciones para Sequelize
 * @module models/notificaciones
 */

import { DataTypes } from "sequelize";
import sequelize from "../config/database";

/**
 * Define el modelo de notificaciones utilizando sequelize 
 * 
 */
const Notificaciones = sequelize.define(
    'Notificaciones',
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
        tipo_notificacion:{
            type: DataTypes.ENUM('cambio_turno', 'derivacion', 'soporte'),
            allowNull: false,
        },
        mensaje:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        prioridad:{
            type: DataTypes.ENUM('baja', 'media', 'alta'),
            allowNull: false,
        },
        leido:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'notificaciones', // Nombre de la tabla en la base de datos
        timestamps: false, // Desactiva los timestamps automáticos (createdAt, updatedAt)
    }
);

// Relaciones
Notificaciones.associate = (models) => {
    Notificaciones.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
  };

  export default Notificaciones; 
