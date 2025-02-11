import bcrypt from 'bcrypt';
import Usuario from '../models/usuario.model.js';

/**
 * Inicia sesión de un usuario.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
export const iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar el usuario por email
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Verificar la contraseña
    const esContraseñaValida = await bcrypt.compare(password, usuario.password);

    if (!esContraseñaValida) {
      return res.status(401).json({ error: 'Contraseña incorrecta.' });
    }

    // Si todo está bien, devolver una respuesta exitosa
    res.status(200).json({ message: 'Inicio de sesión exitoso.', usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión.' });
  }
};