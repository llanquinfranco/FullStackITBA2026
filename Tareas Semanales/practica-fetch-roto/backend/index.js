import express from "express";
import cors from "cors";
import productos from "./data/productos.js";

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(cors());

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



app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
