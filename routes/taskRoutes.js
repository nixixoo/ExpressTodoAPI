const express = require('express')
const router = express.Router()
const {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController')

const {
    validateCreateTask,
    validateUpdateTask,
    handleValidationErrors
} = require('../middleware/taskValidation')
const { protect } = require('../middleware/authMiddleware')

// GET /api/tasks - Obtener todas las tareas
router.get('/', protect, getAllTasks);

// POST /api/tasks - Crear nueva tarea
router.post('/', protect, validateCreateTask, handleValidationErrors, createTask);

// PUT /api/tasks/:id - Actualizar tarea específica
router.put('/:id', protect, validateUpdateTask, handleValidationErrors, updateTask);

// DELETE /api/tasks/:id - Eliminar tarea específica
router.delete('/:id', protect, deleteTask);

module.exports = router;