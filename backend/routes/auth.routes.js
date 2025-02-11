import express from 'express';
import { crearUsuario } from '../controllers/registro.controller.js';
import { iniciarSesion } from '../controllers/inicioSesion.controller.js';

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/registro', crearUsuario);

// Ruta para iniciar sesión
router.post('/login', iniciarSesion);

export default router;