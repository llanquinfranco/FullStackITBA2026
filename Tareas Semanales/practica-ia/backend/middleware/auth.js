const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
    const authorization = req.get("Authorization");
    const match = authorization?.match(/^Bearer\s+(\S+)$/i);

    if (!match) {
        return res.status(401).json({ error: "Token no proporcionado o inválido" });
    }

    let usuario;
    try {
        usuario = jwt.verify(match[1], process.env.JWT_SECRET);
    } catch {
        return res.status(401).json({ error: "Token no proporcionado o inválido" });
    }

    if (!usuario || typeof usuario !== "object" || typeof usuario.id !== "string") {
        return res.status(401).json({ error: "Token no proporcionado o inválido" });
    }

    req.usuario = usuario;
    return next();
};

const soloAdmin = (req, res, next) => {
    if (req.usuario?.rol !== "admin") {
        return res.status(403).json({ error: "Acceso denegado" });
    }

    return next();
};

module.exports = { verificarToken, soloAdmin };
