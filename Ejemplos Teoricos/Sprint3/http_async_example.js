const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
    fs.readFile("archivos\\miArchivo.txt", "utf8", (err, data) => {
        // Simular un retraso de 5 segundos
        setTimeout(() => {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(data);
        }, 5000);
    });
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
