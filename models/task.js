const moongose = require('mongoose');

const taskSchema = new moongose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: '' 
    },
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    user: {
        type: moongose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
});

module.exports = moongose.model('Task', taskSchema);