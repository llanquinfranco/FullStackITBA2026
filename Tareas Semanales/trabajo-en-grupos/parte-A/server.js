// server.js — API de Mueblería Hermanos Jota
// ⚠️ ESTE ARCHIVO TIENE 3 BUGS. No los busques mirando: corré el servidor y leé.

const express = require("./express");
const catalogo = require("./productos");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("API de Mueblería Hermanos Jota");
});

app.get("/api/productos", (req, res) => {
  res.json(catalogo);
});

app.get("/api/productos/:id", (req, res) => {
  const producto = catalogo.find((p) => p.id === req.params.id);

  if (!producto) {
    return res.status(404).json({ error: "No existe el producto con id " + req.params.id });
  }

  res.json(producto);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
