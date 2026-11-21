const jwt = require('jsonwebtoken');

// Primer control: ¿quién sos? (autenticación)
function verificarToken(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'No estás autenticado' });
  }

  const token = header.split(' ')[1];

  try {
    // jwt.verify sin callback es sincrónico y TIRA un error si el token
    // es inválido o venció. Sin este try/catch, Express lo manda al
    // manejador de errores y el cliente recibe un 500 en vez de un 401.
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ mensaje: 'Token inválido o vencido' });
  }
}

// Segundo control: ¿tenés permiso? (autorización). Va DESPUÉS de verificarToken.
function soloAdmin(req, res, next) {
  if (req.usuario && req.usuario.rol === 'admin') return next();
  return res.status(403).json({ mensaje: 'Acceso denegado. Se requiere rol de administrador.' });
}

module.exports = { verificarToken, soloAdmin };
