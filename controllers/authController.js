const User = require('../models/users');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/asyncHandler');

// Función helper para generar JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// POST /api/auth/register - Registrar nuevo usuario
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Verificar si el usuario ya existe
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: 'El usuario ya existe'
    });
  }

  // Crear usuario
  const user = await User.create({
    name,
    email,
    password // Se hashea automáticamente por el middleware pre('save')
  });

  // Generar token
  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    message: 'Usuario registrado exitosamente',
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  });
});

// POST /api/auth/login - Iniciar sesión
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Verificar que el usuario existe
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Credenciales inválidas'
    });
  }

  // Verificar contraseña
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: 'Credenciales inválidas'
    });
  }

  // Generar token
  const token = generateToken(user._id);

  res.json({
    success: true,
    message: 'Login exitoso',
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  });
});

module.exports = {
  registerUser,
  loginUser
};