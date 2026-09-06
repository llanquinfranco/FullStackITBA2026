const http = require("http");
const PORT = 3000;

// Creamos el servidor
const server = http.createServer((req, res) => {
    // req: La petición que llega del cliente (navegador)
    // res: La respuesta que le vamos a enviar de vuelta
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Bienvenido a Mueblería Jota</h1>");
    } else if (req.url === "/productos") {
        res.writeHead(200, { "Content-Type": "application/json" });
        const productos = [
            { id: 1, nombre: "Silla" },
            { id: 2, nombre: "Mesa" },
        ];
        res.end(JSON.stringify(productos));
    } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h2>404 - Página No Encontrada</h2>");
    }
});

// Hacemos que el servidor "escuche" peticiones en el puerto 3000
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
