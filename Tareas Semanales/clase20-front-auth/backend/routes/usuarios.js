const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const { verificarToken } = require('../middleware/auth');

const router = express.Router();

// Lo que sí se puede mostrar de un usuario. La contraseña nunca sale.
function datosPublicos(usuario) {
  return { _id: usuario._id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol };
}

// POST /api/usuarios/registro
router.post('/registro', async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
    return res.status(400).json({ mensaje: 'Nombre, email y contraseña son obligatorios' });
  }

  const existe = await Usuario.findOne({ email: email.toLowerCase() });
  if (existe) {
    return res.status(409).json({ mensaje: 'Ya existe un usuario con ese email' });
  }

  const hash = await bcrypt.hash(password, 10);
  const usuario = await Usuario.create({ nombre, email, password: hash });

  res.status(201).json(datosPublicos(usuario));
});

// POST /api/usuarios/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // typeof: si alguien manda { "email": { "$gt": "" } } no llega a la consulta.
  if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
    return res.status(400).json({ mensaje: 'Email y contraseña son obligatorios' });
  }

  const usuario = await Usuario.findOne({ email: email.toLowerCase() });
  const coincide = usuario && (await bcrypt.compare(password, usuario.password));

  // Mismo status y mismo mensaje si falla el email o la contraseña:
  // así nadie puede averiguar qué emails están registrados.
  if (!coincide) {
    return res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }

  const token = jwt.sign(
    { id: usuario._id, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token, usuario: datosPublicos(usuario) });
});

// GET /api/usuarios/perfil (protegida)
router.get('/perfil', verificarToken, async (req, res) => {
  const usuario = await Usuario.findById(req.usuario.id);
  if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  res.json(datosPublicos(usuario));
});

module.exports = router;
