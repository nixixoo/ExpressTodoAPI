const Task = require('../models/task')

// GET /api/tasks - Obtener todas las tareas
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
        res.json(tasks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// POST /api/tasks - Crear nueva tarea
const createTask = async (req, res) => {
    try {
        const task = new Task(req.body)
        await task.save()
        res.status(201).json(task)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// PUT /api/tasks/:id - Actualizar tarea
const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' })
        }
        res.json(task)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// DELETE /api/tasks/:id - Eliminar tarea
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' })
        }
        res.json({ message: 'Tarea eliminada' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
}