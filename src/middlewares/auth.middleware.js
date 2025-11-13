const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({
      ok: false,
      message: 'Token no proporcionado'
    });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      ok: false,
      message: 'Formato de token inválido'
    });
  }

  const token = parts[1];
  const secret = process.env.JWT_SECRET || 'jwt_simple_secret';

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // aquí ya sabemos quien es el usuario
    next();
  } catch (error) {
    console.error('Error al verificar token:', error);
    return res.status(401).json({
      ok: false,
      message: 'Token inválido o expirado'
    });
  }
}

module.exports = authMiddleware;
