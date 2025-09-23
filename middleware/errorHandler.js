// Middleware para manejar errores globalmente
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
  
    console.error('Error:', err);
  
    // Error de MongoDB - ID inválido
    if (err.name === 'CastError') {
      const message = 'Recurso no encontrado - ID inválido';
      return res.status(400).json({
        success: false,
        message
      });
    }
  
    // Error de validación de MongoDB/Mongoose
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(val => val.message).join(', ');
      return res.status(400).json({
        success: false,
        message
      });
    }
  
    // Error de duplicado (si agregas campos únicos después)
    if (err.code === 11000) {
      const message = 'Recurso duplicado encontrado';
      return res.status(400).json({
        success: false,
        message
      });
    }
  
    // Error por defecto
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Error interno del servidor'
    });
  };
  
  // Middleware para rutas no encontradas
  const notFound = (req, res, next) => {
    res.status(404).json({
      success: false,
      message: `Ruta ${req.originalUrl} no encontrada`
    });
  };
  
  module.exports = {
    errorHandler,
    notFound
  };