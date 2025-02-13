import bcrypt from 'bcrypt';
import Usuario from '../models/usuario.model.js';
import { generateToken } from '../utils/auth.js';
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

    // Generar el token JWT
    const token = generateToken(usuario);

    // Devolver el token y los datos del usuario
    res.json({
        message: 'Inicio de sesión exitoso.',
        token,
        user: {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol,
        },
    });
} catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión.', error });
}
};
    /* Si todo está bien, devolver una respuesta exitosa
    res.status(200).json({ message: 'Inicio de sesión exitoso.', usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión.' });*/
  
