/**
 * @file licencias.model.js
 * @description Define el modelo de Licencias para Sequelize.
 * @module models/Licencias
 */
import { DataTypes } from "sequelize";
import sequelize from "../config/database";

/**
 * Define el modelo de Licencias utilizando Sequelize.
 */
const Licencias = sequelize.define(
    'Licencias',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        usuario_id: {
            field: 'usuario_id', // Nombre de la columna en la base de datos
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Usuario', // Referencia al modelo Usuario
                key: 'id',
            },
        },
        fecha_inicio: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        fecha_fin: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        activa: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            comment: 'Indica si la licencia está activa o no.',
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'licencias', // Nombre de la tabla en la base de datos
        timestamps: false,      // Desactiva los timestamps automáticos (createdAt, updatedAt)
    }
);

// Validación personalizada para las fechas
Licencias.addHook('beforeValidate', (licencia, options) => {
    if (licencia.fecha_inicio >= licencia.fecha_fin) {
        throw new Error('La fecha de inicio debe ser anterior a la fecha de fin.');
    }
});

// Relaciones
Licencias.associate = (models) => {
    /**
     * Una licencia pertenece a un usuario.
     */
    Licencias.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
};

export default Licencias;