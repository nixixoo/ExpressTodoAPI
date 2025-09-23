    # TODO API - Express.js & MongoDB

Una API REST completa para gestión de tareas construida con Express.js, MongoDB y autenticación JWT.

## Características

- ✅ **CRUD completo** de tareas
- ✅ **Autenticación JWT** con registro y login
- ✅ **Autorización** por usuario (cada usuario ve solo sus tareas)
- ✅ **Validaciones robustas** con express-validator
- ✅ **Filtros y búsquedas** avanzadas
- ✅ **Paginación** para listas grandes
- ✅ **Manejo de errores centralizado**
- ✅ **Seguridad** con bcrypt para contraseñas

## Tecnologías

- **Backend:** Express.js
- **Base de datos:** MongoDB con Mongoose
- **Autenticación:** JWT (jsonwebtoken)
- **Validaciones:** express-validator
- **Seguridad:** bcryptjs, CORS
- **Variables de entorno:** dotenv

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/todo-api-express.git
cd todo-api-express

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Ejecutar en desarrollo
npm start
```

## Variables de Entorno

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/todo-app
JWT_SECRET=tu_clave_secreta_super_segura
PORT=3000
```

## Estructura del Proyecto

```
todo-api/
├── controllers/          # Lógica de controladores
├── middleware/          # Middlewares personalizados
├── models/             # Modelos de Mongoose
├── routes/             # Definición de rutas
├── .env               # Variables de entorno
├── server.js          # Punto de entrada
└── package.json
```

---

## Endpoints de la API

### Autenticación

#### Registrar Usuario
```http
POST /api/auth/register
```

**Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456"
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "id": "64abc123...",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Iniciar Sesión
```http
POST /api/auth/login
```

**Body:**
```json
{
  "email": "juan@example.com",
  "password": "123456"
}
```

**Respuesta:** Igual al registro

---

### Tareas (Requieren Autenticación)

> **Nota:** Todas las rutas de tareas requieren el header `Authorization: Bearer <token>`

#### Listar Tareas
```http
GET /api/tasks
```

**Query Parameters:**
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Tareas por página (default: 10, máximo: 50)
- `completed` (opcional): true/false
- `priority` (opcional): low/medium/high
- `search` (opcional): Buscar en título y descripción

**Ejemplos:**
```http
GET /api/tasks?page=1&limit=5
GET /api/tasks?completed=true&priority=high
GET /api/tasks?search=comprar&page=2
```

**Respuesta:**
```json
{
  "success": true,
  "page": 1,
  "limit": 10,
  "total": 25,
  "pages": 3,
  "count": 10,
  "data": [
    {
      "_id": "64abc123...",
      "title": "Comprar leche",
      "description": "Ir al supermercado",
      "completed": false,
      "priority": "medium",
      "user": "64user123...",
      "createdAt": "2024-01-01T10:00:00.000Z",
      "updatedAt": "2024-01-01T10:00:00.000Z"
    }
  ]
}
```

#### Crear Tarea
```http
POST /api/tasks
```

**Body:**
```json
{
  "title": "Nueva tarea",
  "description": "Descripción opcional",
  "priority": "high"
}
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "_id": "64abc123...",
    "title": "Nueva tarea",
    "description": "Descripción opcional",
    "completed": false,
    "priority": "high",
    "user": "64user123...",
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T10:00:00.000Z"
  }
}
```

#### Actualizar Tarea
```http
PUT /api/tasks/:id
```

**Body:** (todos los campos son opcionales)
```json
{
  "title": "Tarea actualizada",
  "completed": true,
  "priority": "low"
}
```

#### Eliminar Tarea
```http
DELETE /api/tasks/:id
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Tarea eliminada correctamente"
}
```

---

## Validaciones

### Usuario
- **name:** Requerido
- **email:** Requerido, formato email válido, único
- **password:** Requerido, mínimo 6 caracteres

### Tarea
- **title:** Requerido, 1-100 caracteres
- **description:** Opcional, máximo 500 caracteres
- **priority:** Opcional, valores: "low", "medium", "high"
- **completed:** Opcional, boolean

---

## Códigos de Estado HTTP

- `200` - OK
- `201` - Creado
- `400` - Datos inválidos
- `401` - No autorizado
- `403` - Prohibido
- `404` - No encontrado
- `500` - Error del servidor

---

## Ejemplos de Uso

### 1. Registro y Login
```bash
# Registrar usuario
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan","email":"juan@test.com","password":"123456"}'

# Guardar el token de la respuesta
TOKEN="eyJhbGciOiJIUzI1NiIs..."
```

### 2. Crear y Gestionar Tareas
```bash
# Crear tarea
curl -X POST http://localhost:3000/api/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Comprar leche","priority":"high"}'

# Listar tareas
curl -X GET http://localhost:3000/api/tasks \
  -H "Authorization: Bearer $TOKEN"

# Buscar tareas completadas
curl -X GET "http://localhost:3000/api/tasks?completed=true" \
  -H "Authorization: Bearer $TOKEN"
```

---

## Seguridad

- **Contraseñas hasheadas** con bcrypt (costo 12)
- **JWT tokens** con expiración de 30 días
- **Validación de entrada** en todos los endpoints
- **Autorización por usuario** (cada usuario ve solo sus tareas)
- **CORS configurado** para requests cross-origin

---

## Desarrollo

```bash
# Modo desarrollo con nodemon
npm run dev

# Ejecutar tests (si están configurados)
npm test

# Linting
npm run lint
```

---

## Contribuir

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

---

## Autor

Tu Nombre - [tu-email@example.com](mailto:tu-email@example.com)

Proyecto Link: [https://github.com/tu-usuario/todo-api-express](https://github.com/tu-usuario/todo-api-express)