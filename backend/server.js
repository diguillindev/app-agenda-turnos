// server.js
/**
 * @file app.js
 * @description Archivo principal del servidor Express.
 * Configura el servidor, los middlewares y las rutas.
 */

import express from 'express';
import usuarioRoutes from './routes/usuario.routes.js';
import authRoutes from './routes/auth.routes.js'; //conecta las rutas de registro e inicio de sesion 
import protectedRoutes from './routes/protected.routes.js';//rutas protegidas con JWT 

const app = express();

/**
 * Middleware para parsear JSON.
 * Permite que el servidor interprete solicitudes con cuerpo JSON.
 */
app.use(express.json());
app.use('/api/auth', authRoutes); // Rutas de autenticación
/**
 * Rutas de la aplicación.
 * Todas las rutas relacionadas con usuarios estarán bajo el prefijo `/api`.
 */
app.use('/api', usuarioRoutes);

// Rutas protegidas
app.use('/api/protected', protectedRoutes);

/**
 * Inicia el servidor Express.
 * @param {number} PORT - Puerto en el que escuchará el servidor (por defecto: 3000).
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});