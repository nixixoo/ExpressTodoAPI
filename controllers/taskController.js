const Task = require('../models/task')
const asyncHandler = require('../middleware/asyncHandler')

// GET /api/tasks - Obtener todas las tareas
const getAllTasks = asyncHandler(async (req, res) => {
    const { completed, priority, search, page = 1, limit = 10 } = req.query

    // Construir objeto de filtrado dinamicamente
    let filters = { user: req.user._id }

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

    // Convertir números y aplicar filtros
    const pageNum = parseInt(page)
    const limitNum = parseInt(limit) > 50 ? 50 : parseInt(limit)
    const skip = (pageNum - 1) * limitNum

    // Consulta a la base de datos
    const tasks = await Task.find(filters)
    .skip(skip)
    .limit(limitNum)
    .sort({ createdAt: -1 })

    const total = await Task.countDocuments(filters)

    res.json({
        success: true,
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
        count: tasks.length,
        data: tasks
    })
})
// POST /api/tasks - Crear nueva tarea
const createTask = asyncHandler(async (req, res) => {
    const task = new Task({
        ...req.body,
        user: req.user._id
    })
    await task.save()
    res.status(201).json(task)
})

// PUT /api/tasks/:id - Actualizar tarea
const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id })
    if (!task) {
        return res.status(404).json({ 
            success: false,
            message: 'Tarea no encontrada o no tienes permisos' 
        })
    }
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedTask)
})

// DELETE /api/tasks/:id - Eliminar tarea
const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id })
    if (!task) {
        return res.status(404).json({ 
            success: false,
            message: 'Tarea no encontrada o no tienes permisos' 
        })
    }
    
    await Task.findByIdAndDelete(req.params.id)
    
    res.json({ 
        success: true,
        message: 'Tarea eliminada correctamente' 
    })
})

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
}