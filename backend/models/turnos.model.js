/**
 * @file turnos.model.js
 * @description Define el modelo de Turnos para Sequelize
 * @module models/Turnos
 */
import { DataTypes } from "sequelize";
import sequelize from "../config/database";

/**
 * Define el modelo de Turnos utilizando Sequelize
 */
const Turnos = sequelize.define(
    'Turnos',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Usuario', // Nombre de la tabla del modelo Usuario
                key: 'id',         // Clave primaria en el modelo Usuario
            },
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        hora_inicio: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        hora_fin: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        tipo_turno: {
            type: DataTypes.ENUM('mañana', 'tarde', 'noche'),
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [10, 500], // Validación de longitud
                notContains: ['<script>', '</script>'], // Evita inyecciones XSS
            },
        },
        estado: {
            type: DataTypes.ENUM('pendiente', 'confirmado', 'cancelado'),
            allowNull: false,
        },
    },
    {
        tableName: 'turnos', // Nombre de la tabla en la base de datos
        timestamps: false,   // Desactiva los timestamps automáticos (createdAt, updatedAt)
    }
);

// Relaciones
Turnos.associate = (models) => {
    Turnos.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
};

// Validación de rangos de tiempo
Turnos.addHook('beforeValidate', (turno, options) => {
    if (turno.hora_inicio >= turno.hora_fin) {
        throw new Error('La hora de inicio debe ser anterior a la hora de fin.');
    }
});

export default Turnos;