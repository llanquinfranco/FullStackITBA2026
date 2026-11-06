function aplicarDescuento(precio, porcentajeDescuento) {
    let montoDescuento = precio * (porcentajeDescuento / 100);
    let precioFinal = precio - montoDescuento;
    return precioFinal
}

let precioMesa = 10000;
let precioSofa = 30000;

let descuentoMesa = 10;
let descuentoSofa = 25;

let precioFinalMesa = aplicarDescuento(precioMesa, descuentoMesa);
let precioFinalSofa = aplicarDescuento(precioSofa, descuentoSofa);

console.log(`Precio original de la mesa: $${precioMesa}. Descuento: ${descuentoMesa}%. Precio final: ${precioFinalMesa}`);
console.log(`Precio original del sofá: $${precioSofa}. Descuento: ${descuentoSofa}%. Precio final: ${precioFinalSofa}`);