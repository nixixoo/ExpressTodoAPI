# TODO API - Express.js & MongoDB

A complete REST API for task management built with Express.js, MongoDB, and JWT authentication.

## Features

- ✅ **Complete CRUD** operations for tasks
- ✅ **JWT Authentication** with registration and login
- ✅ **User Authorization** (each user sees only their tasks)
- ✅ **Robust Validations** with express-validator
- ✅ **Advanced Filtering & Search** capabilities
- ✅ **Pagination** for large datasets
- ✅ **Centralized Error Handling**
- ✅ **Security** with bcrypt password hashing

## Technologies

- **Backend:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Validations:** express-validator
- **Security:** bcryptjs, CORS
- **Environment Variables:** dotenv

## Installation

```bash
# Clone repository
git clone https://github.com/your-username/todo-api-express.git
cd todo-api-express

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your configurations

# Run in development
npm start
```

## Environment Variables

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/todo-app
JWT_SECRET=your_super_secret_jwt_key
PORT=3000
```

## Project Structure

```
todo-api/
├── controllers/          # Controller logic
├── middleware/          # Custom middlewares
├── models/             # Mongoose models
├── routes/             # Route definitions
├── .env               # Environment variables
├── server.js          # Entry point
└── package.json
```

---

## API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "64abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Login
```http
POST /api/auth/login
```

**Body:**
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

**Response:** Same as registration

---

### Tasks (Authentication Required)

> **Note:** All task routes require the `Authorization: Bearer <token>` header

#### List Tasks
```http
GET /api/tasks
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Tasks per page (default: 10, max: 50)
- `completed` (optional): true/false
- `priority` (optional): low/medium/high
- `search` (optional): Search in title and description

**Examples:**
```http
GET /api/tasks?page=1&limit=5
GET /api/tasks?completed=true&priority=high
GET /api/tasks?search=shopping&page=2
```

**Response:**
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
      "title": "Buy milk",
      "description": "Go to the supermarket",
      "completed": false,
      "priority": "medium",
      "user": "64user123...",
      "createdAt": "2024-01-01T10:00:00.000Z",
      "updatedAt": "2024-01-01T10:00:00.000Z"
    }
  ]
}
```

#### Create Task
```http
POST /api/tasks
```

**Body:**
```json
{
  "title": "New task",
  "description": "Optional description",
  "priority": "high"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64abc123...",
    "title": "New task",
    "description": "Optional description",
    "completed": false,
    "priority": "high",
    "user": "64user123...",
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T10:00:00.000Z"
  }
}
```

#### Update Task
```http
PUT /api/tasks/:id
```

**Body:** (all fields are optional)
```json
{
  "title": "Updated task",
  "completed": true,
  "priority": "low"
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

## Validations

### User
- **name:** Required
- **email:** Required, valid email format, unique
- **password:** Required, minimum 6 characters

### Task
- **title:** Required, 1-100 characters
- **description:** Optional, maximum 500 characters
- **priority:** Optional, values: "low", "medium", "high"
- **completed:** Optional, boolean

---

## HTTP Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Usage Examples

### 1. Registration and Login
```bash
# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"123456"}'

# Save the token from response
TOKEN="eyJhbGciOiJIUzI1NiIs..."
```

### 2. Creating and Managing Tasks
```bash
# Create task
curl -X POST http://localhost:3000/api/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy milk","priority":"high"}'

# List tasks
curl -X GET http://localhost:3000/api/tasks \
  -H "Authorization: Bearer $TOKEN"

# Search completed tasks
curl -X GET "http://localhost:3000/api/tasks?completed=true" \
  -H "Authorization: Bearer $TOKEN"
```

---

## Security

- **Password hashing** with bcrypt (cost 12)
- **JWT tokens** with 30-day expiration
- **Input validation** on all endpoints
- **User-scoped authorization** (users see only their tasks)
- **CORS enabled** for cross-origin requests

---

## Development

```bash
# Development mode with nodemon
npm run dev

# Run tests (if configured)
npm test

# Linting
npm run lint
```

---

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

## Author

Nicolás Aliaga - [nico.aliaga02@gmail.com](mailto:nico.aliaga02@gmail.com)

Project Link: [https://github.com/nixixoo/ExpressSimpleAPI](https://github.com/nixixoo/ExpressSimpleAPI)