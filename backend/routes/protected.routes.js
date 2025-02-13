// routes/protectedRoutes.js
import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Ruta para administradores
router.get('/admin/dashboard', authenticate, authorize(['admin']), (req, res) => {
    res.json({ message: 'Bienvenido al panel de administrador.' });
});

// Ruta para médicos
router.get('/medico/turnos', authenticate, authorize(['medico']), (req, res) => {
    res.json({ message: 'Turnos asignados obtenidos.' });
});

// Ruta para usuarios
router.get('/usuario/mis-turnos', authenticate, authorize(['usuario']), (req, res) => {
    res.json({ message: 'Mis turnos obtenidos.' });
});

export default router;