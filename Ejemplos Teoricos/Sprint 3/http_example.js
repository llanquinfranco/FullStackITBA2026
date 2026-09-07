const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Hola mundo!");
    } else if (req.url === "/api") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                message: "Bienvenido a la API",
                timestamp: new Date().toISOString(),
            }),
        );
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Ruta no encontrada");
    }
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
