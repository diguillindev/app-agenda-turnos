import bcrypt from 'bcrypt';
import Usuario from '../models/usuario.model.js';

/**
 * Crea un nuevo usuario.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
export const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol, telefono } = req.body;

    // Validación básica
    if (!nombre || !email || !password || !rol) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados.' });
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
    }

    // Hashear la contraseña
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Crear el usuario con la contraseña hasheada
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password: passwordHash,
      rol,
      telefono,
    });

    res.status(201).json({ message: 'Usuario creado correctamente.', usuario: nuevoUsuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el usuario.' });
  }
};