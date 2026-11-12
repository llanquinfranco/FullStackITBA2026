const express = require("express");
const router = express.Router();
const Categoria = require("../models/Categoria");

router.get("/", async (req, res, next) => {
    try {
        const categorias = await Categoria.find().sort({ nombre: 1 });
        res.json(categorias);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    const { nombre } = req.body;

    if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
        const error = new Error("El nombre de la categoría es obligatorio");
        error.status = 400;
        return next(error);
    }

    try {
        const categoria = await Categoria.create({ nombre: nombre.trim() });
        res.status(201).json(categoria);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
