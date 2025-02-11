import 'dotenv/config'; // Cargar variables de entorno desde el archivo .env

/**
 * Configuración de la conexión a la base de datos.
 * Este objeto contiene los parámetros necesarios para establecer la conexión a la base de datos
 * utilizando Sequelize como ORM.
 * @module dbConfig
 * @type {Object}
 * @property {string} HOST - Dirección IP o nombre del host de la base de datos.
 * @property {string} USER - Usuario de la base de datos.
 * @property {string} PASSWORD - Contraseña del usuario de la base de datos.
 * @property {string} DB - Nombre de la base de datos a la que se conectará.
 * @property {number} PORT - Puerto de la base de datos.
 * @property {string} dialect - Dialecto de la base de datos (en este caso, "mariadb").
 * @property {Object} pool - Configuración del pool de conexiones.
 * @property {number} pool.max - Número máximo de conexiones en el pool.
 * @property {number} pool.min - Número mínimo de conexiones en el pool.
 * @property {number} pool.acquire - Tiempo máximo (en milisegundos) que Sequelize intentará obtener una conexión antes de lanzar un error.
 * @property {number} pool.idle - Tiempo máximo (en milisegundos) que una conexión puede estar inactiva antes de ser liberada.
 */
const dbConfig = {
  /** @type {string} */
  HOST: process.env.DB_HOST, // Host de la base de datos (por ejemplo, 127.0.0.1)

  /** @type {string} */
  USER: process.env.DB_USER, // Usuario de la base de datos (por ejemplo, root)

  /** @type {string} */
  PASSWORD: process.env.DB_PASSWORD, // Contraseña del usuario de la base de datos

  /** @type {string} */
  DB: process.env.DB_NAME, // Nombre de la base de datos

  /** @type {number} */
  PORT: process.env.DB_PORT, // Puerto de la base de datos (por ejemplo, 3306)

  /** @type {string} */
  dialect: 'mariadb', // Especifica el dialecto como MariaDB

  /** @type {Object} */
  pool: {
    /** @type {number} */
    max: 5, // Número máximo de conexiones en el pool

    /** @type {number} */
    min: 0, // Número mínimo de conexiones en el pool

    /** @type {number} */
    acquire: 30000, // Tiempo máximo para adquirir una conexión (30 segundos)

    /** @type {number} */
    idle: 10000, // Tiempo máximo de inactividad de una conexión (10 segundos)
  },
};



export default dbConfig; // Exportar la configuración como un módulo ES