<!--
  NO reemplacen su AGENTS.md: copien desde "## Reglas de trabajo" hasta el final
  y péguenlo AL FINAL del AGENTS.md que ya tienen (el que corrigieron en la práctica de Categorías).
  Estas líneas salen de lo que ustedes mismos anotaron en esa práctica.
-->

## Reglas de trabajo (agregadas después de la práctica de Categorías)

- Si una regla de este archivo choca con el código que ya existe, avisá y preguntá antes de refactorizar código que no es parte de la tarea.
- Si la spec no define un caso, preguntá. No decidas.
- NO cambies los mensajes ni el formato de respuestas que ya existen.
- NO mates procesos, liberes puertos ni reinicies el servidor sin pedir permiso.
- NO corras comandos que escriban en la base (npm test, npm run test:auth, npm run seed) sin avisar antes.
- Si la misma lógica va en dos rutas, usá una función o un middleware compartido.
- Al terminar cada fase, listá TODOS los archivos que tocaste, incluso los cambios de formato.

## Seguridad (autenticación)

- NO leas, muestres ni copies el contenido de `.env`. Si necesitás una variable nueva, agregá la clave vacía a `.env.example` y avisá.
- NO escribas secretos en el código: el secreto del token se lee de `process.env.JWT_SECRET`.
- NUNCA devuelvas la contraseña ni su hash en una respuesta, ni la pongas en el payload del token.
- NO instales paquetes que no estén en la spec (`bcrypt` o `bcryptjs`, y `jsonwebtoken`).
- NO modifiques `tests/auth.test.cjs`. Si una prueba falla, se corrige el backend.
- NO crees archivos de prueba nuevos sin pedir permiso. Las pruebas del contrato son las de `tests/auth.test.cjs`.
