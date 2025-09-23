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

// GET /api/tasks - Obtener todas las tareas
router.get('/', getAllTasks);

// POST /api/tasks - Crear nueva tarea
router.post('/', validateCreateTask, handleValidationErrors, createTask);

// PUT /api/tasks/:id - Actualizar tarea específica
router.put('/:id', validateUpdateTask, handleValidationErrors, updateTask);

// DELETE /api/tasks/:id - Eliminar tarea específica
router.delete('/:id', deleteTask);

module.exports = router;