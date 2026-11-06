const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Product = require("../models/Product");
const Categoria = require("../models/Categoria");

const validarCategoriaExistente = async (categoriaId) => {
    if (categoriaId === undefined || categoriaId === null || categoriaId === "") {
        return;
    }

    if (!mongoose.Types.ObjectId.isValid(categoriaId)) {
        const error = new Error("La categoría no existe");
        error.status = 400;
        throw error;
    }

    const categoria = await Categoria.findById(categoriaId);

    if (!categoria) {
        const error = new Error("La categoría no existe");
        error.status = 400;
        throw error;
    }
};

router.get("/", async (req, res, next) => {
    const { categoria } = req.query;
    const filtro = {};

    if (categoria) {
        if (!mongoose.Types.ObjectId.isValid(categoria)) {
            return res.status(400).json({ error: "Identificador de categoría inválido" });
        }
        filtro.categoria = categoria;
    }

    const productos = await Product.find(filtro)
        .populate("categoria", "nombre")
        .sort({ createdAt: -1 });

    res.json(productos);
});

router.get("/:id", async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Identificador o parámetro con formato inválido" });
    }

    const producto = await Product.findById(id).populate("categoria", "nombre");

    if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(producto);
});

router.post("/", async (req, res, next) => {
    const { nombre, categoria, precio, imagenUrl, descripcion, detalles, stock } = req.body;

    if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
        return res.status(400).json({ error: "El nombre del producto es obligatorio" });
    }

    if (precio === undefined || precio === null || Number.isNaN(Number(precio)) || Number(precio) < 0) {
        return res.status(400).json({ error: "El precio es obligatorio y debe ser un número mayor o igual a 0" });
    }

    if (stock !== undefined && stock !== null && (Number.isNaN(Number(stock)) || Number(stock) < 0)) {
        return res.status(400).json({ error: "El stock debe ser un número mayor o igual a 0" });
    }

    await validarCategoriaExistente(categoria);

    const nuevoProducto = await Product.create({
        nombre: nombre.trim(),
        categoria: categoria || undefined,
        precio: Number(precio),
        imagenUrl: typeof imagenUrl === "string" ? imagenUrl.trim() : "",
        descripcion: typeof descripcion === "string" ? descripcion.trim() : "",
        detalles: detalles || {},
        stock: stock !== undefined && stock !== null ? Number(stock) : 0,
    });

    res.status(201).json(await Product.findById(nuevoProducto._id).populate("categoria", "nombre"));
});

router.put("/:id", async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Identificador o parámetro con formato inválido" });
    }

    if (req.body.categoria !== undefined) {
        await validarCategoriaExistente(req.body.categoria);
    }

    const productoActualizado = await Product.findByIdAndUpdate(
        id,
        req.body,
        { returnDocument: "after", runValidators: true }
    ).populate("categoria", "nombre");

    if (!productoActualizado) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(productoActualizado);
});

router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Identificador o parámetro con formato inválido" });
    }

    const productoEliminado = await Product.findByIdAndDelete(id);

    if (!productoEliminado) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado correctamente" });
});

module.exports = router;
