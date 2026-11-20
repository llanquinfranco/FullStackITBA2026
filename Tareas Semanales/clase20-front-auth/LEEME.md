# Clase 20: el front de autenticación

Hoy el front aprende a **iniciar sesión, recordar quién sos, mandar el token y cerrar el paso** a las páginas que no te corresponden. Lo escriben ustedes, sin agente.

## ¿Con qué proyecto trabajo?

- **Su backend pasa 9 de 12** (`npm run test:auth`): trabajen sobre **su proyecto**.
- **Si no:** usen este zip. Trae `backend/` con la autenticación resuelta (12 de 12) y `client/` sin autenticación. Esta semana pasan lo que hagan hoy a su proyecto.

Su proyecto puede tener otros nombres de campos o de archivos. Adapten, no copien a ciegas.

## Casilla 0: levantar todo (10 min)

```
cd backend
npm install
```
Creen `.env` copiando `.env.example` (`MONGO_URI` de su Atlas, `JWT_SECRET` largo). Después:
```
npm run seed
npm run dev
```
El seed **borra** productos y usuarios y crea dos usuarios: `admin@jota.com` / `admin123` y `cliente@jota.com` / `cliente123`. Úsenlo en una base de prueba, no en la de su entrega.

En otra terminal:
```
cd client
npm install
npm run dev
```

✅ **Chequeo:** en `http://localhost:5173`, "Nuevo producto" → completen y guarden → aparece **"No estás autenticado"**. Bien: el backend está protegido y el front todavía no manda el token. Eso es lo que arreglamos hoy.

---

## Casilla 1: el AuthContext (15 min)

Creen `src/context/AuthContext.jsx`:

```jsx
import { createContext, useContext, useState } from 'react';
import { API } from '../api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // La sesión es lo que devuelve el login: { token, usuario }. Sin sesión: null.
  const [sesion, setSesion] = useState(() => JSON.parse(localStorage.getItem('sesion')));

  async function login(email, password) {
    const respuesta = await fetch(`${API}/api/usuarios/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const datos = await respuesta.json();
    if (!respuesta.ok) throw new Error(datos.mensaje || 'No se pudo iniciar sesión');
    localStorage.setItem('sesion', JSON.stringify(datos));
    setSesion(datos);
  }

  function logout() {
    localStorage.removeItem('sesion');
    setSesion(null);
  }

  const valor = {
    usuario: sesion ? sesion.usuario : null,
    token: sesion ? sesion.token : null,
    login,
    logout,
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
```

En `src/main.jsx`, envuelvan `<App />` (adentro de `<BrowserRouter>`):

```jsx
import { AuthProvider } from './context/AuthContext.jsx';
// ...
<BrowserRouter>
  <AuthProvider>
    <App />
  </AuthProvider>
</BrowserRouter>
```

✅ **Chequeo:** la app se sigue viendo igual. Si queda en blanco con `Cannot destructure property 'usuario' of 'useAuth(...)' as it is null`, falta el `<AuthProvider>`.

**Pregunta para el .txt:** ¿por qué guardamos la sesión en `localStorage` *y* en el estado? ¿Qué pasa si la guardamos solo en uno de los dos?

Guardamos la sesión en ambos lugares porque cumplen funciones complementarias: el estado de React (en el contexto de autenticación) dispara el re-renderizado inmediato de los componentes cuando cambia el usuario o se cierra sesión, mientras que localStorage mantiene los datos guardados ante recargas de página (F5) o cierres del navegador.
Solo en el estado: al recargar la página se borra la memoria de la app y se pierde la sesión, obligando a iniciar sesión de nuevo.
Solo en localStorage: la información persiste, pero React no detecta los cambios al hacer login o logout hasta recargar la página, por lo que la interfaz no se actualiza sola al instante.

---

## Casilla 2: la página de login (15 min)

Creen `src/pages/Login.jsx`:

```jsx
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate(location.state?.desde || '/', { replace: true });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section>
      <h1>Ingresar</h1>
      <form onSubmit={handleSubmit} className="formulario">
        <label>Email <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Contraseña <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        {error && <p className="error">{error}</p>}
        <button type="submit">Ingresar</button>
      </form>
    </section>
  );
}
```

En `App.jsx`: `<Route path="/login" element={<Login />} />`.

✅ **Chequeo:** en `/login`, con contraseña mala aparece "Credenciales inválidas". Con `admin@jota.com` / `admin123` vuelve al catálogo, y en DevTools → Application → Local Storage aparece `sesion` con el token y el usuario.

---

## Casilla 3: la Navbar sabe quién sos (10 min)

En `Navbar.jsx`: `const { usuario, logout } = useAuth();` y

- con sesión: `Hola, {usuario.nombre}` y un botón **Cerrar sesión** (`onClick={logout}`);
- sin sesión: un link a `/login`;
- "Nuevo producto", solo si `usuario.rol === 'admin'`.

✅ **Chequeo:** después del login dice "Hola, Admin Jota". **Recarguen la página: sigue logueado.** Cerrar sesión vuelve a "Ingresar".

---

## Casilla 4: rutas protegidas (10 min)

Creen `src/components/ProtectedRoute.jsx`:

```jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children, soloAdmin = false }) {
  const { usuario } = useAuth();
  const location = useLocation();

  if (!usuario) {
    return <Navigate to="/login" replace state={{ desde: location.pathname }} />;
  }
  if (soloAdmin && usuario.rol !== 'admin') {
    return <p className="error">Necesitás ser administrador para ver esta página.</p>;
  }
  return children;
}
```

Envuelvan las rutas de admin:

```jsx
<Route path="/admin/crear-producto" element={<ProtectedRoute soloAdmin><ProductoForm key="crear" /></ProtectedRoute>} />
```

(y lo mismo con `/admin/editar-producto/:id`)

✅ **Chequeo:** sin sesión, `/admin/crear-producto` manda a `/login`, y después del login vuelve a `/admin/crear-producto`. Con `cliente@jota.com` aparece el mensaje de administrador.

---

## Casilla 5: mandar el token (10 min)

En `ProductoForm.jsx` (crear y editar) y en el botón Eliminar de `ProductoDetalle.jsx`:

```jsx
const { token } = useAuth();
// ...
headers: {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
},
```

(El DELETE no lleva `Content-Type`, solo `Authorization`.)

✅ **Chequeo:** logueados como admin, crear, editar y eliminar funcionan. La "No estás autenticado" de la casilla 0 desapareció.

---

## Si les sobra tiempo

- **Registro:** página `/registro` que llama a `POST /api/usuarios/registro` y después a `login()`. Mejor todavía: una función `registrar` dentro del `AuthProvider`.
- **Perfil:** página `/perfil` protegida que pide `GET /api/usuarios/perfil` con el token y muestra nombre, email y rol. Si responde 401, `logout()`.
- Ocultar Editar y Eliminar del detalle si no sos admin.

## Entrega

En el hilo de Slack de la clase 20, **antes del domingo 22/11 a las 23:59**: hasta qué casilla llegaron y la respuesta a la pregunta de la casilla 1.

## Si se traban

| Síntoma | Qué mirar |
|---|---|
| Pantalla en blanco, `useAuth(...) as it is null` | Falta `<AuthProvider>` en `main.jsx` |
| `Failed to fetch` en el login | El backend no está prendido, o el `API` de `src/api.js` apunta a otro puerto |
| Login OK pero al recargar se desloguea | Falta leer `localStorage` en el `useState` inicial |
| Crear producto sigue en 401 | Falta el header, o le falta el espacio: tiene que ser `Bearer ` + token |
| Crear producto da 403 | Están logueados como cliente: entren con el admin |
| Después de cerrar sesión en `/perfil` aparece el login | Es lo esperado: `ProtectedRoute` ve que ya no hay usuario |
