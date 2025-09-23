const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    
    // Solo iniciar el servidor después de conectar a la BD
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error conectando a MongoDB:', error);
  });

// Importar rutas
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

// Importar middlewares de error
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Usar las rutas
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: '¡Hola desde tu API de tareas!' });
});

app.use(notFound)
app.use(errorHandler)
