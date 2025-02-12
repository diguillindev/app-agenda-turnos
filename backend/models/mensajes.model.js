/**
 * @file mensajes.model.js
 * @description Define el modelo de Mensajes para Sequelize.
 * @module models/Mensajes
 */
import { DataTypes } from "sequelize";
import sequelize from "../config/database";

/**
 * Define el modelo de Mensajes utilizando Sequelize.
 */
const Mensajes = sequelize.define(
    'Mensajes',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        remitente_id: {
            field: 'remitente_id', // Nombre de la columna en la base de datos
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Usuario', // Referencia al modelo Usuario
                key: 'id',
            },
        },
        destinatario_id: {
            field: 'destinatario_id', // Nombre de la columna en la base de datos
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Usuario', // Referencia al modelo Usuario
                key: 'id',
            },
        },
        asunto: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        contenido: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        leido: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'mensajes', // Nombre de la tabla en la base de datos
        timestamps: false,     // Desactiva los timestamps automáticos (createdAt, updatedAt)
    }
);

// Relaciones
Mensajes.associate = (models) => {
    /**
     * Un mensaje pertenece a un usuario como remitente.
     */
    Mensajes.belongsTo(models.Usuario, { as: 'Remitente', foreignKey: 'remitente_id' });

    /**
     * Un mensaje pertenece a un usuario como destinatario.
     */
    Mensajes.belongsTo(models.Usuario, { as: 'Destinatario', foreignKey: 'destinatario_id' });
};

export default Mensajes;