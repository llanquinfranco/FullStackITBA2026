# Práctica con agente: Autenticación (Sprint 7)

**Qué:** registro, login, una ruta protegida y roles en el backend de la Mueblería, con el agente (Cursor u otro), siguiendo una spec y 12 pruebas de contrato. El mismo formato que la práctica de Categorías.

**Por qué ahora:** la consigna final pide cuentas de cliente y compras a su nombre. El jueves armamos el front (login, Context, rutas protegidas) contra esta API. **Si el backend no está, el jueves no hay contra qué conectar.**

## Cómo trabajan

- Maneja **UNA persona por vez**. El resto lee los diffs y anota.
- Si se le acaban los créditos: `commit` + `push`, y sigue otra persona con `git pull` en su Cursor.
- **Lean cada diff antes de aceptarlo.** En autenticación un error no se ve en pantalla: se ve cuando alguien entra donde no debía.

## Casillas

☐ **0. Kit instalado**
  - `docs/spec-auth.md` y `tests/auth.test.cjs` → a la carpeta del backend (junto a los `docs/` y `tests/` de Categorías).
  - `AGENTS-agregar.md` → copien su contenido **al final** de su `AGENTS.md`. No lo reemplacen.
  - En `package.json` → `scripts` agreguen: `"test:auth": "node --test tests/auth.test.cjs"`
  - En el `.env` agreguen `JWT_SECRET=` con una frase larga inventada. En `.env.example`, solo `JWT_SECRET=`.
  - Servidor prendido (`npm run dev`) y en otra terminal: `npm run test:auth` → **0 de 12**. Bien.

☐ **1. Fase 1: modelo y registro** → **4 de 12**
  Ejemplo de pedido: *"Leé docs/spec-auth.md y AGENTS.md. Hacé SOLO la Fase 1. No toques nada más. Antes de modificar, mostrame qué archivos vas a tocar."*

☐ **2. Fase 2: login y token** → **6 de 12**

☐ **3. Fase 3: middleware y perfil** → **9 de 12**

☐ **4. Fase 4: roles** → **12 de 12**
  Después de esta fase, el alta y la edición de productos del front dan 401. Es lo esperado: lo arreglamos el jueves.

Después de cada fase: **diff → aceptar → `npm run test:auth`**.

## El archivo .txt (esto es lo que se entrega)

**A. Qué hizo el agente que la spec no pedía.** Un archivo de más, una librería, un `try/catch`, un nombre cambiado, un comando que corrió solo...

**B. Cuatro preguntas. Respóndanlas ustedes, sin el agente.** Si no pueden, no es suyo todavía.
  1. ¿En qué archivo y en qué línea se hashea la contraseña? ¿Por qué no se guarda tal cual?
  2. ¿Qué viaja dentro del token? Decodifiquen uno (comando abajo) y péguenlo. ¿Por qué no puede ir la contraseña ahí?
  3. ¿Por qué el login responde lo mismo si falla el email o si falla la contraseña?
  4. ¿Por qué después de cambiar el rol a admin en Compass hay que volver a loguearse?

Para ver qué hay dentro de un token (reemplacen `PEGUEN_EL_TOKEN`):

```
node -e "console.log(JSON.parse(Buffer.from(process.argv[1].split('.')[1],'base64url')))" PEGUEN_EL_TOKEN
```

## Entrega

En el hilo de Slack: **cuántas pruebas en verde (de 12)** + el contenido del .txt (A y B).

## Si se traban

| Síntoma | Qué mirar |
|---|---|
| `No pude conectarme a http://localhost:3000` | El servidor no está prendido, o usa otro puerto: revisen `PORT` en el `.env`. |
| `No encontré MONGO_URI en el .env` | Corran `npm run test:auth` parados en la carpeta del backend. |
| `Cannot find module 'mongoose'` | Lo mismo: están en otra carpeta. |
| PowerShell: `npm.ps1 no se puede cargar` | Usen la terminal `cmd` o escriban `npm.cmd run test:auth`. |
| `npm install bcrypt` falla en Windows | Usen `bcryptjs` (`require('bcryptjs')`, misma API). Anótenlo en el .txt. |
| La prueba 8 da 500 | `jwt.verify` tiró un error y nadie lo atrapó (regla 6 de la spec). |
| La prueba 12 dice que el payload no tiene `rol` | El rol tiene que ir en el `jwt.sign`. |
| Ya tenían `/api/users` del campus | Manda la spec: `/api/usuarios`. El front del jueves va contra esa ruta. |

**Nunca peguen el contenido del `.env` ni el connection string en el chat del agente.**

Las pruebas crean un usuario y un producto de prueba y los borran al terminar: no ensucian su base.
