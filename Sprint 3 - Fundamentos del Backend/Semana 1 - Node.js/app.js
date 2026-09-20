const productoUtils = require("./productoUtils.js");
const logger = require("./logger.js");

const objetoPrueba1 = {
    nombre: "Sillón Copacabana",
    stock: 5
};

const objetoPrueba2 = {
    nombre: "Mesa de Centro Araucaria",
    stock: 0
};

const disponibilidad1 = productoUtils.estaDisponible(objetoPrueba1);
const info1 = productoUtils.obtenerInfo(objetoPrueba1);
console.log(`El producto 1 posee stock?: ${disponibilidad1}`);
console.log(`Info del producto 1: ${info1}`);

const disponibilidad2 = productoUtils.estaDisponible(objetoPrueba2);
const info2 = productoUtils.obtenerInfo(objetoPrueba2);
console.log(`El producto 2 posee stock?: ${disponibilidad2}`);
console.log(`Info del producto 2: ${info2}`);

logger.log('Probando log:');
logger.log('Se inició el proceso de inventario.');
logger.log('Se detectó un producto sin stock.');



