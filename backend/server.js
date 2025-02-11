// server.js

/**
 * Importa el módulo Express para crear el servidor.
 */
import express from 'express';

/**
 * Crea una instancia de la aplicación Express.
 * @type {Express.Application}
 */
const app = express();

/**
 * Puerto en el que se ejecutará el servidor.
 * @constant {number}
 */
const PORT = 3000;

// Middleware para analizar JSON
/**
 * Middleware que analiza cuerpos de solicitud en formato JSON.
 * @name jsonParser
 * @function
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar el control al siguiente middleware.
 */
app.use(express.json());

// Ruta de prueba
/**
 * Ruta GET para la raíz del servidor.
 * @name get/
 * @function
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {void}
 */
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Iniciar el servidor
/**
 * Inicia el servidor HTTP en el puerto especificado.
 * @function
 * @listens PORT - Puerto en el que escucha el servidor.
 */
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});