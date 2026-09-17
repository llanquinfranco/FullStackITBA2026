const express = require("express");
const router = express.Router();

const productos = [
    { id: 1, nombre: "Aparador Uspallata" },
    { id: 2, nombre: "Biblioteca Recoleta" },
    { id: 3, nombre: "Butaca Mendoza" },
];

router.get("/", (req, res) => {
    res.json(productos);
});

router.get("/:id", (req, res, next) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if(!producto) {
        const error = new Error("Producto no encontrado");
        error.status = 404;
        // Salta al manejador centralizado
        return next(error);
    }
    res.json({mensaje: `Obteniendo información del producto con ID: ${producto.id}`});
});

router.post("/", (req, res) => {
    const nuevoProducto = req.body;
    console.log("Producto recibido: ", nuevoProducto);
    res.status(201).json({ 
        estado: "exito",
        producto_recibido: nuevoProducto});
});

module.exports = router;
