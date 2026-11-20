# Tarea: el carrito pasa a un Context

Hoy el carrito vive en `App` y baja por props: `App` → `Catalogo` (`onAgregar`), `App` → `ProductoDetalle` (`onAgregar`), `App` → `Navbar` (`cantidad`), `App` → `Carrito`. Eso es **prop drilling**, y la rúbrica de la entrega final pide sacarlo: *"el estado de autenticación y del carrito se gestiona globalmente con Context API"*.

La buena noticia: ya lo hicieron con el `AuthContext`. Es el mismo molde, con el código que ya tienen en `App`.

## Casilla 1: `src/context/CartContext.jsx`

Copien la estructura de `AuthContext.jsx` y muevan adentro del Provider **todo lo del carrito que hoy está en `App`**:

- el `useState` del carrito (con la lectura de `localStorage`),
- el `useEffect` que lo guarda en `localStorage`,
- la función de agregar,
- la de vaciar.

Además, calculen ahí `cantidadTotal` y `total`, así ningún componente repite la cuenta.

El `value` del Provider: `{ carrito, agregar, vaciar, cantidadTotal, total }`.
Exporten `CartProvider` y un hook `useCart()`.

## Casilla 2: envolver la app

En `main.jsx`, adentro del `AuthProvider`:

```jsx
<AuthProvider>
  <CartProvider>
    <App />
  </CartProvider>
</AuthProvider>
```

## Casilla 3: sacar las props

- `App`: borren el estado del carrito y las funciones. Las rutas quedan sin props: `<Catalogo />`, `<ProductoDetalle />`, `<Carrito />`, `<Navbar />`.
- `Catalogo` y `ProductoDetalle`: `const { agregar } = useCart();` en lugar de recibir `onAgregar`.
- `Navbar`: `const { cantidadTotal } = useCart();` en lugar de recibir `cantidad`.
- `Carrito`: `const { carrito, vaciar, total } = useCart();`.

## ✅ Chequeo

1. Agregan productos desde el catálogo **y** desde el detalle, y el número de la Navbar sube.
2. Recargan la página y el carrito sigue ahí.
3. "Vaciar carrito" lo deja en 0.
4. En `App.jsx` ya no aparece la palabra `carrito`.

Si la pantalla queda en blanco con `Cannot destructure property 'agregar' of 'useCart(...)' as it is null`, falta el `<CartProvider>`.

## Para pensar (va en el .txt)

¿Por qué el `CartProvider` va **adentro** del `AuthProvider` y no al revés? ¿Importa? (Pista: piensen qué va a necesitar el carrito cuando tenga que hacer "Finalizar compra" con el token.)

Sí, importa por jerarquía de contextos y consumo de datos. En React, un componente o provider solo puede leer un contexto mediante useContext / su hook (useAuth()) si está por debajo (adentro) del provider correspondiente en el árbol de componentes.
Cuando el carrito necesite hacer "Finalizar compra" (por ejemplo, enviar el pedido al backend autenticado con el token o asociarlo al usuario actual), CartContext va a poder llamar a useAuth() para acceder a token y usuario.
Si AuthProvider estuviera adentro de CartProvider, CartContext no tendría acceso a AuthContext (obtendría null). Además, tiene sentido conceptual: primero existe la sesión/autenticación del usuario y, dentro de ese contexto, opera su carrito.

## Entrega

En el hilo de la clase 20, con lo de hoy: **domingo 22/11, 23:59**.
