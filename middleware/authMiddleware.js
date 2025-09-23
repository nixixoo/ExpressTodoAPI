const jwt = require('jsonwebtoken');
const User = require('../models/users');
const asyncHandler = require('./asyncHandler');

// Middleware para proteger rutas
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Verificar si el token existe en el header Authorization
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extraer token del header "Bearer TOKEN_AQUI"
      token = req.headers.authorization.split(' ')[1];

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Buscar usuario y agregarlo al req
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No autorizado, token requerido'
    });
  }
});

// Middleware para verificar roles específicos
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `El rol ${req.user.role} no tiene permisos para esta acción`
      });
    }
    next();
  };
};

module.exports = {
  protect,
  authorize
};