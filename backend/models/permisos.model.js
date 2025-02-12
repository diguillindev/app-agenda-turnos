/**
 * @file permisos.model.js
 * @description Define el modelo de Permisos para Sequelize.
 * @module models/Permisos
 */
import { DataTypes } from "sequelize";
import sequelize from "../config/database";

/**
 * Define el modelo de Permisos utilizando Sequelize.
 */
const Permisos = sequelize.define(
    'Permisos',
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
        rol: {
            type: DataTypes.ENUM('admin', 'usuario', 'medico', 'enfermero'),
            allowNull: false,
        },
        permiso: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [3, 50], // Validación de longitud (mínimo 3 caracteres, máximo 50)
            },
        },
        habilitado: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        tableName: 'permisos', // Nombre de la tabla en la base de datos
        timestamps: false,    // Desactiva los timestamps automáticos (createdAt, updatedAt)
        indexes: [
            {
                unique: true,
                fields: ['rol', 'permisos'], // Restricción única en la combinación de rol y permiso
            },
        ],
    }
);

// Relaciones
Permisos.associate = (models) => {
    /**
     * Un permiso pertenece a un usuario.
     */
    Permisos.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
};

export default Permisos;