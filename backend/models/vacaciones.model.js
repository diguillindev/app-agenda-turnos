/**
 * @file vacaciones.model.js
 * @description Define el modelo de Vacaciones para Sequelize.
 * @module models/vacaciones
 */
import { DataTypes } from "sequelize";
import sequelize from "../config/database";

/**
 * Define el modelo de Vacaciones utilizando Sequelize.
 */
const Vacaciones = sequelize.define(
    'Vacaciones',
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
        motivo: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [10, 500], // Validación de longitud (mínimo 10 caracteres, máximo 500)
            },
        },
        aprobado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'vacaciones', // Nombre de la tabla en la base de datos
        timestamps: false,      // Desactiva los timestamps automáticos (createdAt, updatedAt)
    }
);

// Relaciones
Vacaciones.associate = (models) => {
    /**
     * Una solicitud de vacaciones pertenece a un usuario.
     */
    Vacaciones.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
};

// Validación personalizada para las fechas
Vacaciones.addHook('beforeValidate', (vacacion, options) => {
    if (vacacion.fecha_inicio >= vacacion.fecha_fin) {
        throw new Error('La fecha de inicio debe ser anterior a la fecha de fin.');
    }
});

export default Vacaciones;
