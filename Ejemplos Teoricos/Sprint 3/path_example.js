const path = require("path");

// Unir rutas de forma multiplataforma (Windows, Linux, etc.)
const rutaCompleta = path.join("archivos", "miArchivo.txt");

const rutaLinux = "archivos/miArchivo.txt";
const rutaWindows = "archivos\\miArchivo.txt";

console.log("Ruta completa:", rutaCompleta);

// Obtener la extensión de un archivo
const extension = path.extname(rutaCompleta);
console.log("Extension del archivo:", extension);

// Obtener el nombre base de un archivo
const nombreBase = path.basename(rutaCompleta);
console.log("Nombre base del archivo:", nombreBase);
