const os = require("os");

// Obtener la plataforma del sistema operativo
const plataforma = os.platform();
console.log("Plataforma del sistema operativo:", plataforma);

// Obtener la memoria libre del sistema
const memoriaLibre = os.freemem();
console.log("Memoria libre (bytes):", memoriaLibre);

// Obtener la memoria total del sistema
const memoriaTotal = os.totalmem();
console.log("Memoria total (bytes):", memoriaTotal);

// Obtener información de la CPU
const cpuInfo = os.cpus();
console.log("Información de la CPU:", cpuInfo[0].model);
