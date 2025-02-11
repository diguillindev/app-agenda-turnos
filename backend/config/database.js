/**
 * @file database.js
 * @description Configura la conexión a la base de datos utilizando Sequelize.
 * @module config/database
 */

import { Sequelize } from 'sequelize';
import dbConfig from './db.config.js';

/**
 * Crea una instancia de Sequelize para conectarse a la base de datos.
 * @type {import('sequelize').Sequelize}
 */
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect, // Especifica el dialecto de la base de datos (MariaDB)
  pool: dbConfig.pool, // Configuración del pool de conexiones
});

/**
 * Prueba la conexión a la base de datos.
 * @function
 * @returns {Promise<void>} - Resuelve si la conexión es exitosa, rechaza en caso de error.
 */
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

export default sequelize;
