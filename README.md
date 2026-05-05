# Task Manager

Aplicación web de gestión de tareas con autenticación de usuarios, construida como proyecto de portafolio para practicar desarrollo web fullstack con FastAPI y React.

## Stack

**Backend**
- FastAPI — API REST con documentación Swagger automática
- SQLAlchemy — ORM para interacción con la base de datos
- PostgreSQL — base de datos relacional
- JWT (via python-jose) — autenticación sin estado
- bcrypt (via passlib) — hasheo de contraseñas

**Frontend**
- React + Vite — interfaz basada en componentes
- React Router — enrutamiento del lado del cliente con rutas protegidas
- Axios — cliente HTTP con interceptores de requests
- Context API — estado global de autenticación

## Funcionalidades

- Registro e inicio de sesión (acepta email o username)
- Autenticación con JWT y rutas protegidas
- CRUD completo de tareas: crear, leer, actualizar, eliminar
- Marcar tareas como completadas o pendientes
- Filtrar tareas por estado (todas, pendientes, completadas)
- Contador de tareas completadas en el navbar
- Modal de confirmación al eliminar
- Interfaz en modo oscuro

## Estructura del proyecto

```
task-auth/
├── backend/
│   ├── main.py             # punto de entrada, middleware, registro de routers
│   ├── database.py         # configuración del motor y sesión de SQLAlchemy
│   ├── models.py           # definición de tablas User y Task
│   ├── schemas.py          # schemas de Pydantic para requests y responses
│   ├── auth.py             # creación de JWT, hasheo de contraseñas, dependencia de usuario actual
│   └── routers/
│       ├── users.py        # POST /users/register
│       ├── auth_router.py  # POST /auth/login
│       └── tasks.py        # GET, POST, PUT, DELETE /tasks
└── frontend/
    └── src/
        ├── api/
        │   └── axios.js          # URL base e interceptor del token de autenticación
        ├── context/
        │   ├── AuthContext.jsx   # AuthProvider con lógica de login/logout
        │   └── useAuth.js        # hook personalizado para consumir el contexto
        ├── components/
        │   ├── PrivateRoute.jsx  # redirige a /login si no hay sesión activa
        │   └── TaskCard.jsx      # tarjeta de tarea con acciones de editar, eliminar y completar
        ├── pages/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   └── Tasks.jsx
        └── App.jsx               # definición de rutas
```

## Correr localmente

### Requisitos

- Python 3.10+
- Node.js 18+
- PostgreSQL corriendo localmente

### Backend

```bash
cd backend
pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic python-jose[cryptography] passlib[bcrypt] python-dotenv email-validator bcrypt==4.0.1
```

Crear un archivo `.env` dentro de `backend/`:

```
DATABASE_URL=postgresql://tu_usuario:tu_contraseña@127.0.0.1:5432/nombre_db
SECRET_KEY=tu_clave_secreta_aqui
```

Iniciar el servidor:

```bash
python -m uvicorn main:app --host 127.0.0.1 --port 8001 --reload
```

Documentación de la API disponible en `http://127.0.0.1:8001/docs`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicación disponible en `http://localhost:5173`

## Endpoints

| Método | Endpoint | Autenticación | Descripción |
|--------|----------|---------------|-------------|
| POST | /users/register | No | Crear un nuevo usuario |
| POST | /auth/login | No | Iniciar sesión y recibir token JWT |
| GET | /tasks/ | Si | Obtener todas las tareas del usuario actual |
| POST | /tasks/ | Si | Crear una nueva tarea |
| PUT | /tasks/{id} | Si | Actualizar una tarea |
| DELETE | /tasks/{id} | Si | Eliminar una tarea |

## Notas

- El frontend guarda el JWT en localStorage y lo adjunta automáticamente a cada request mediante un interceptor de Axios
- Cada usuario solo puede ver y modificar sus propias tareas — la propiedad se verifica del lado del servidor usando el ID del usuario autenticado
- Las contraseñas se hashean con bcrypt antes de guardarse y nunca se retornan en ninguna respuesta
