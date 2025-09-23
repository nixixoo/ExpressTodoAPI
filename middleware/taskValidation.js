const { body, validationResult } = require('express-validator');

// Reglas de validación para crear tarea
const validateCreateTask = [
  body('title')
    .notEmpty()
    .withMessage('El título es obligatorio')
    .isLength({ min: 1, max: 100 })
    .withMessage('El título debe tener entre 1 y 100 caracteres')
    .trim(),
    
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('La descripción no puede exceder 500 caracteres')
    .trim(),
    
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('La prioridad debe ser: low, medium o high'),
    
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('El campo completed debe ser true o false')
];

// Reglas de validación para actualizar tarea
const validateUpdateTask = [
  body('title')
    .optional()
    .notEmpty()
    .withMessage('El título no puede estar vacío')
    .isLength({ min: 1, max: 100 })
    .withMessage('El título debe tener entre 1 y 100 caracteres')
    .trim(),
    
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('La descripción no puede exceder 500 caracteres')
    .trim(),
    
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('La prioridad debe ser: low, medium o high'),
    
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('El campo completed debe ser true o false')
];

// Middleware para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Datos inválidos',
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  validateCreateTask,
  validateUpdateTask,
  handleValidationErrors
};