const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
const { verificarToken } = require("../middleware/auth");

router.post("/registro", async (req, res) => {
    const { nombre, email, password } = req.body ?? {};

    if (
        typeof nombre !== "string" ||
        !nombre.trim() ||
        typeof email !== "string" ||
        !email.trim() ||
        typeof password !== "string" ||
        password.length === 0
    ) {
        return res.status(400).json({
            error: "Nombre, email y contraseña son obligatorios",
        });
    }

    const usuario = await Usuario.create({ nombre, email, password });

    res.status(201).json({
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
    });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body ?? {};

    if (
        typeof email !== "string" ||
        !email.trim() ||
        typeof password !== "string" ||
        password.length === 0
    ) {
        return res.status(400).json({
            error: "El email y la contraseña son obligatorios",
        });
    }

    const usuario = await Usuario.findOne({ email: email.trim().toLowerCase() });
    const credencialesValidas =
        usuario && (await bcrypt.compare(password, usuario.password));

    if (!credencialesValidas) {
        return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
        { id: usuario._id, rol: usuario.rol },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({
        token,
        usuario: {
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol,
        },
    });
});

router.get("/perfil", verificarToken, async (req, res) => {
    const usuario = await Usuario.findById(req.usuario.id).select("-password");

    if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
    });
});

module.exports = router;
