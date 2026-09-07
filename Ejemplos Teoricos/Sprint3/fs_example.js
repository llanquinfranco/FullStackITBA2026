const fs = require("fs");

// Lectura de un archivo
fs.readFile("archivos\\miArchivo.txt", "utf8", (err, data) => {
    if (err) {
        console.error("Error al leer el archivo:", err);
        return;
    }

    console.log(data);
});

// Escritura de un archivo
const contenido = "Hola, mundo! Este es mi segundo archivo.";
fs.writeFile("archivos\\miArchivo_2.txt", contenido, (err) => {
    if (err) {
        console.error("Error al escribir en el archivo:", err);
        return;
    }
});
