const express = require("express");
const app = express();
const logger = require("./logger.js");

const PORT = 3000;

app.use(logger);

app.get("/", (req, res) => {
   res.send("¡Bienvenido al servidor de Muebleria Jota!"); 
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo exitosamente en http://localhost:${PORT}`);
});