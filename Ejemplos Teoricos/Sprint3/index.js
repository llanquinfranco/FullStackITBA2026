// 1. Importamos nuestro módulo. La ruta './' significa "en la misma carpeta".
const calculadora = require('./calculadoraPrecios.js');

// 2. 'calculadora' ahora contiene el objeto que exportamos.
const precioSilla = 5000;
const precioMesa = 20000;

// 3. Usamos las funciones del módulo
const precioFinalSilla = calculadora.sumarIva(precioSilla);
console.log(`El precio final de la silla es: $${precioFinalSilla}`);

// Salida: El precio final de la silla es: $6050
const precioMesaConDescuento = calculadora.calcularDescuento(precioMesa, 15); // Un 15% de descuento

console.log(`El precio de la mesa con descuento es: $${precioMesaConDescuento}`);
// Salida: El precio de la mesa con descuento es: $17000