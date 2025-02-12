/**
 * @file cambios_turno.model.js
 * @description Define el modelo de Cambios de Turno para Sequelize.
 * @module models/CambiosTurno
 */
import { DataTypes } from "sequelize";
import sequelize from "../config/database";

/**
 * Define el modelo de Cambios de Turno utilizando Sequelize.
 */
const CambiosTurno = sequelize.define(
    'Cambios_Turno',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        turnoOrigenId: {
            field: 'turno_origen_id', // Nombre de la columna en la base de datos
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Turnos', // Referencia al modelo Turnos
                key: 'id',       // Clave primaria en el modelo Turnos
            },
        },
        turnoDestinoId: {
            field: 'turno_destino_id', // Nombre de la columna en la base de datos
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Turnos', // Referencia al modelo Turnos
                key: 'id',       // Clave primaria en el modelo Turnos
            },
        },
        motivo: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [10, 500], // Validación de longitud
            },
        },
        estado: {
            type: DataTypes.ENUM('pendiente', 'confirmado', 'cancelado'),
            allowNull: false,
        },
        admin_id: {
            field: 'admin_id', // Nombre de la columna en la base de datos
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Usuario', // Referencia al modelo Usuario
                key: 'id',        // Clave primaria en el modelo Usuario
            },
        },
        fecha_aprobacion: {
            field: 'fecha_aprobacion', // Nombre de la columna en la base de datos
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
        tableName: 'cambios_turno', // Nombre de la tabla en la base de datos
        timestamps: false,         // Desactiva los timestamps automáticos (createdAt, updatedAt)
    }
);

// Relaciones
CambiosTurno.associate = (models) => {
    /**
     * Un cambio de turno pertenece a un usuario (solicitante).
     */
    CambiosTurno.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });

    /**
     * Un cambio de turno pertenece a un administrador (quien aprueba o rechaza).
     */
    CambiosTurno.belongsTo(models.Usuario, { as: 'Admin', foreignKey: 'admin_id' });

    /**
     * Un cambio de turno tiene un turno de origen.
     */
    CambiosTurno.belongsTo(models.Turno, { as: 'TurnoOrigen', foreignKey: 'turnoOrigenId' });

    /**
     * Un cambio de turno tiene un turno de destino.
     */
    CambiosTurno.belongsTo(models.Turno, { as: 'TurnoDestino', foreignKey: 'turnoDestinoId' });
};

export default CambiosTurno;