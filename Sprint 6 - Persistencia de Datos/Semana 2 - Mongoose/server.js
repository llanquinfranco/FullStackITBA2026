const express = require("express");
const mongoose = require("mongoose");
const Categoria = require("./models/Categoria");
const Producto = require("./models/Producto");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/api/productos", async (req, res) => {
    try {
        const productos = await Producto.find().populate("categoria");
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/productos/ofertas", async (req, res) => {
    try {
        const ofertas = await Producto.find({ precio: { $lt: 9000 } })
            .sort({ precio: 1 })
            .limit(5)
            .populate("categoria", "nombre");

        res.json(ofertas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/productos/:id", async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id).populate("categoria");
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/categorias", async (req, res) => {
    try {
        const nuevaCategoria = await Categoria.create(req.body);
        res.status(201).json(nuevaCategoria);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post("/api/productos", async (req, res) => {
    try {
        const nuevoProducto = await Producto.create(req.body);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put("/api/productos/:id", async (req, res) => {
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!productoActualizado) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json(productoActualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete("/api/productos/:id", async (req, res) => {
    try {
        const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
        if (!productoEliminado) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
