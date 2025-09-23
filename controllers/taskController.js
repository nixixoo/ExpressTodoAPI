const Task = require('../models/task')
const asyncHandler = require('../middleware/asyncHandler')

// GET /api/tasks - Obtener todas las tareas
const getAllTasks = asyncHandler(async (req, res) => {
    const { completed, priority, search } = req.query

    // Construir objeto de filtrado dinamicamente
    let filters = {}

    // Filtro por estado completado
    if (completed !== undefined)  {
        filters.completed = completed === 'true'
    }

    // Filtro por prioridad
    if (priority) {
        filters.priority = priority
    }

    if (search) {
        filters.$or = [
            { title: {$regex: search, $options: 'i'} },
            { description: { $regex: search, $options: 'i' } }
        ]
    }

    const tasks = await Task.find(filters)

    res.json({
        success: true,
        count: tasks.length,
        data: tasks
    })
})
// POST /api/tasks - Crear nueva tarea
const createTask = asyncHandler(async (req, res) => {
    const task = new Task(req.body)
    await task.save()
    res.status(201).json(task)
})

// PUT /api/tasks/:id - Actualizar tarea
const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!task) {
        return res.status(404).json({ message: 'Tarea no encontrada' })
    }
    res.json(task)
})

// DELETE /api/tasks/:id - Eliminar tarea
const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) {
        return res.status(404).json({ message: 'Tarea no encontrada' })
    }
    res.json({ message: 'Tarea eliminada' })
})

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
}