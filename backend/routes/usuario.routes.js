/**
 * @file usuario.routes.js
 * @description Define las rutas relacionadas con los usuarios.
 * @module routes/usuario
 */

import express from 'express';
import Usuario from '../models/usuario.model.js';

const router = express.Router();

/**
 * Ruta GET para obtener todos los usuarios.
 * @name GET /usuarios
 * @function
 * @memberof module:routes/usuario
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object[]} 200 - Lista de usuarios en formato JSON.
 * @returns {Object} 500 - Mensaje de error en caso de fallo.
 */
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
});

export default router;