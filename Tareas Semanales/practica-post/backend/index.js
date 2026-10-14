import express from "express";
import cors from "cors";
import productos from "./data/productos.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.get("/api/productos", (req, res) => {
    res.json(productos);
});

app.get("/api/productos/:id", (req, res) => {
    const id = Number(req.params.id);
    const producto = productos.find((p) => p.id === id);

    if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(producto);
});

app.post("/api/productos", (req, res) => {
    const { nombre, precio } = req.body;

    if (!nombre || !precio) {
        return res.status(400).json({ error: "Faltan nombre o precio" });
    }

    const nuevo = {
        id: productos.length + 1,
        nombre,
        precio: Number(precio),
        imagen: "/img/silla-eames.svg",
    };

    productos.push(nuevo);
    res.status(201).json(nuevo);
});

app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(err.status || 500).json({ error: "Algo salió mal en el servidor" });
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
