// utils/auth.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET no está definida en las variables de entorno.');
}

// Función para generar un token
export const generateToken = (user) => {
    return jwt.sign({ id: user.id, rol: user.rol }, JWT_SECRET, { expiresIn: '1h' });
};

// Función para verificar un token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null; // Si el token es inválido o expiró
    }
};