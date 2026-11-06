const http = require("http");
const PORT = 5000;

// Creamos el servidor
const server = http.createServer((req, res) => {
    // req: La petición que llega del cliente (navegador)
    // res: La respuesta que le vamos a enviar de vuelta
    if(req.url === "/") {
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.end("<h1>Bienvenido al servidor de Mueblería Jota</h1>");
    } else if(req.url === "/productos") {
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.end("<h2>Nuestro catálogo de productos</h2>");
    } else if(req.url === "/contacto") {
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.end("<p>Contáctanos al 555-1234</p>");
    } else {
        res.writeHead(404, {"content-type": "text/html; charset=utf-8"});
        res.end("<h2>Página no encontrada</h2>");
    }
});

// Hacemos que el servidor "escuche" peticiones en el puerto 5000
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
