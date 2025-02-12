/**
 * @file derivacion.model.js
 * @description Define el modelo de Derivaciones para Sequelize.
 * @module models/Derivacion
 */
import { DataTypes } from "sequelize";
import sequelize from "../config/database";

/**
 * Define el modelo de Derivación utilizando Sequelize.
 */
const Derivacion = sequelize.define(
    'Derivacion',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        paciente_id: {
            field: 'paciente_id', // Nombre de la columna en la base de datos
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Pacientes', // Referencia al modelo Pacientes
                key: 'id',
            },
        },
        usuario_id: {
            field: 'usuario_id', // Corregido el error tipográfico
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Usuario', // Referencia al modelo Usuario
                key: 'id',
            },
        },
        especialidad: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        observaciones: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        estado: {
            type: DataTypes.ENUM('pendiente', 'enviada', 'rechazada'),
            allowNull: false,
        },
        fecha_resolucion: {
            field: 'fecha_resolucion', // Nombre de la columna en la base de datos
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        created_at: {
            field: 'created_at', // Nombre de la columna en la base de datos
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'derivacion', // Nombre de la tabla en la base de datos
        timestamps: false,       // Desactiva los timestamps automáticos (createdAt, updatedAt)
    }
);

// Relaciones
Derivacion.associate = (models) => {
    /**
     * Una derivación pertenece a un paciente.
     */
    Derivacion.belongsTo(models.Paciente, { foreignKey: 'paciente_id' });

    /**
     * Una derivación pertenece a un usuario (médico).
     */
    Derivacion.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
};

export default Derivacion;