# Práctica 1: el `fetch` roto

Este zip trae el proyecto con la conexión entre `client` y `backend` ya escrita: CORS, el `fetch` en un `useEffect`, cargando y error. Es lo mismo que entregaron, pero **está roto a propósito**.

Hay **3 bugs**: 1 en `backend/index.js` y 2 en `client/src/App.jsx`. Cada casilla de abajo se destraba arreglando uno. Van en orden: no saltees.

No hay que escribir nada nuevo. Hay que mirar el síntoma, encontrar el renglón y arreglarlo.

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

Servidor en `http://localhost:3000`, React en `http://localhost:5173`. Abrí las DevTools con F12 y dejá a la vista la consola, la pestaña Network y la terminal del servidor.

## Definición de terminado

- [x] 1. Con los dos servidores levantados, **la consola ya no muestra el error de CORS**. (Pista: la terminal del servidor muestra que el pedido llegó. Ojo: al arreglarlo la pantalla queda en blanco. Está bien: ese es el bug que sigue.)
- [x] 2. **Se ven las 6 tarjetas** del catálogo. (Pista: leé el error de la consola y seguí el dato desde el primer `.then` hasta el segundo.)
- [x] 3. Cortás el servidor con Ctrl + C, recargás el React y aparece **"No pudimos cargar el catálogo: Failed to fetch"** en vez de una página sin productos y sin explicación.

Bonus: `npm run lint` en `client/` avisa de uno de los bugs. ¿Cuál, y por qué el linter se da cuenta?

## Cuando terminen

Un integrante escribe en el chat de la sala principal el número de casillas del grupo (0 a 3).
