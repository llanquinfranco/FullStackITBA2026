require("dotenv").config(); 

const express = require("express");
const app = express();
const logger = require("./middlewares/logger.js");

const userRoutes = require("./routes/userRoutes.js");

const PORT = 4000;

app.use(logger);
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("¡Bienvenido al servidor de Fran!");
});

// Middleware ATRAPA-TODO: captura las rutas que no existen (404)
app.use((req, res, next) => {
    const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
    error.status = 404;
    next(error);
});

// El manejador de errores centralizado
app.use((err, req, res, next) => {
    const codigoEstado = err.status || 500;
    console.error(err.message, err.stack);
    res.status(codigoEstado).json({
        mensaje: err.message || "Ha ocurrido un error en el servidor",
        stack: process.env.NODE_ENV === "production" ? "eh?" : err.stack,
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo exitosamente en http://localhost:${PORT}`);
});







