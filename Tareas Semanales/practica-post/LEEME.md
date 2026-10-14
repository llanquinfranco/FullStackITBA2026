# Práctica 2: el formulario que crea un producto

Este zip trae el proyecto con la práctica 1 resuelta (el catálogo sale de la API, con `async/await`) y una parte nueva que **está rota a propósito**:

- `backend/index.js`: ya tiene `express.json()`, la ruta `POST /api/productos` y un manejador de errores.
- `client/src/components/NuevoProductoForm.jsx`: un formulario controlado que manda el producto nuevo con `fetch`.

Hay **4 bugs**: 3 en el formulario y 1 en el backend. Cada casilla de abajo se destraba arreglando uno. Van en orden: no saltees.

## Para arrancar

Dos terminales:

```
cd backend
npm install
npm run dev
```

```
cd client
npm install
npm run dev
```

Servidor en `http://localhost:3000`, React en `http://localhost:5173`. Abrí las DevTools con F12 y dejá a la vista la pestaña Network y la terminal del servidor.

## Definición de terminado

Para probar cada casilla: escribí un nombre y un precio en el formulario y apretá Guardar.

- [X] 1. Al guardar, **la página no se recarga**: la URL sigue siendo `http://localhost:5173/`, sin un `?` al final, y debajo del botón aparece un mensaje.
- [X] 2. El mensaje dice **"No se pudo crear: Algo salió mal en el servidor"** y ya no `Unexpected token '<'`. (Pista: mirá qué te contestó el servidor en Network → Response. El arreglo está en el backend.)
- [X] 3. El mensaje dice **"Producto creado con id 7"** y en Network el POST figura con status **201**. (Pista: la terminal del servidor dice qué le faltó.)
- [X] 4. La tarjeta del producto nuevo **aparece en el catálogo sin apretar F5**.

Bonus:

- Guardá con el precio vacío. ¿Qué status ves en Network y qué mensaje aparece?
- Creá un producto, cortá el servidor con Ctrl + C, volvé a levantarlo y recargá el React. ¿Dónde quedó el producto? ¿Por qué?
- `npm run lint` en `client/` avisa de dos de los bugs. Corrélo antes y después.

## Cuando terminen

Un integrante responde en el hilo de Slack con el número de casillas del grupo (0 a 4).

Después, llévenlo a su repo: la entrega del Sprint 5 y 6 pide `POST /api/productos` respondiendo 201 y una página para dar de alta productos. Este formulario es la base.
