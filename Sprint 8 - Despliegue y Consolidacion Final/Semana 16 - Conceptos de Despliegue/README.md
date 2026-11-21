# Mueblería Jota

Aplicación web full-stack de e-commerce desarrollada para **Mueblería Hermanos Jota**. Permite explorar el catálogo de productos, consultar el detalle de cada mueble, gestionar un carrito de compras, registrar usuarios, iniciar sesión con persistencia de sesión, consultar el perfil de usuario y administrar el inventario (crear, editar y eliminar productos) mediante un sistema de control de acceso basado en roles.

---

## Enlaces Públicos

- **Frontend (Vercel):** [https://tu-proyecto.vercel.app](https://tu-proyecto.vercel.app)
- **Backend / API (Render):** [https://tu-backend.onrender.com](https://tu-backend.onrender.com)

---

## Tecnologías Utilizadas

### Frontend
- **React:** biblioteca para la construcción de interfaces de usuario.
- **Vite:** herramienta de desarrollo y compilación.
- **React Router (`react-router-dom`):** navegación y gestión de rutas.
- **Context API:** manejo del estado global de autenticación y carrito de compras.

### Backend
- **Node.js:** entorno de ejecución de JavaScript.
- **Express:** framework para la creación de la API REST.
- **MongoDB:** base de datos NoSQL.
- **Mongoose:** modelado y gestión de datos en MongoDB.

### Autenticación y Seguridad
- **JSON Web Tokens (`jsonwebtoken`):** autenticación mediante tokens JWT.
- **bcryptjs:** encriptación (hash) de contraseñas.
- **CORS:** configuración del acceso entre distintos orígenes.
- **dotenv:** gestión de variables de entorno.

---

## Estructura del Proyecto

```text
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── db.js
│   ├── index.js
│   └── package.json
│
└── client/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── api.js
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

---

## Instrucciones para la Instalación Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

### 2. Instalar las dependencias del backend

```bash
cd backend
npm install
```

### 3. Configurar las variables de entorno del backend

Crear un archivo `.env` dentro de la carpeta `backend/`, tomando como referencia el archivo `.env.example`:

```ini
PORT=3000
MONGO_URI=tu_cadena_de_conexion_de_mongodb
JWT_SECRET=tu_secreto_largo_y_aleatorio
```

### 4. Instalar las dependencias del frontend

Desde la carpeta raíz del proyecto:

```bash
cd client
npm install
```

### 5. Configurar las variables de entorno del frontend

Crear un archivo `.env` dentro de la carpeta `client/` con la URL del backend local:

```ini
VITE_API_URL=http://localhost:3000
```

### 6. Iniciar los servidores en desarrollo

Abrir dos terminales independientes.

**Terminal 1 – Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 – Frontend:**

```bash
cd client
npm run dev
```

Una vez iniciados ambos servidores, la aplicación estará disponible en la dirección local que indique Vite (generalmente `http://localhost:5173`).

---

## Endpoints Principales de la API

### Productos (`/api/productos`)

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| GET | `/api/productos` | Obtiene el listado completo de productos. | Público |
| GET | `/api/productos/:id` | Obtiene el detalle de un producto específico. | Público |
| POST | `/api/productos` | Crea un nuevo producto. | Administrador |
| PUT | `/api/productos/:id` | Edita un producto existente. | Administrador |
| DELETE | `/api/productos/:id` | Elimina un producto. | Administrador |

### Usuarios (`/api/usuarios`)

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| POST | `/api/usuarios/registro` | Registra un nuevo usuario. | Público |
| POST | `/api/usuarios/login` | Inicia sesión y devuelve el token JWT junto con los datos del usuario. | Público |
| GET | `/api/usuarios/perfil` | Devuelve los datos del usuario autenticado. | Usuario autenticado |

---

## Funcionalidades Principales

### Catálogo y Detalle de Productos
Visualización del catálogo de muebles disponibles y consulta de información detallada de cada producto, incluyendo descripción, precio y stock.

### Carrito de Compras
Posibilidad de agregar productos al carrito, modificar las cantidades y eliminar artículos.

### Autenticación y Control de Roles
Registro de nuevos usuarios e inicio y cierre de sesión mediante autenticación con JWT. La sesión se mantiene mediante el almacenamiento del estado de autenticación y `localStorage`.

Implementación de rutas protegidas y permisos diferenciados entre usuarios estándar y administradores (`admin`).

### Perfil de Usuario
Vista protegida que permite consultar los datos del usuario autenticado mediante una solicitud a la API.

La aplicación gestiona automáticamente el cierre de sesión cuando el token JWT expira o deja de ser válido, recibiendo una respuesta `401` del servidor.

### Panel de Administración
Panel de gestión del inventario que permite crear, editar y eliminar productos. Estas operaciones están habilitadas exclusivamente para usuarios con rol de administrador (`admin`).

---

## Autor

Desarrollado por Franco Llanquin como proyecto de e-commerce para **Mueblería Hermanos Jota**.