// middleware/authMiddleware.js
import { verifyToken } from '../utils/auth.js';

export const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    // Extraer el token (después de "Bearer ")
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido o expirado.' });
    }

    // Adjuntar los datos del usuario al request
    req.user = decoded;
    next();
};