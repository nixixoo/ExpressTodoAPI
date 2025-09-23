const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// POST /api/auth/register - Registrar usuario
router.post('/register', registerUser);

// POST /api/auth/login - Iniciar sesión
router.post('/login', loginUser);

module.exports = router;