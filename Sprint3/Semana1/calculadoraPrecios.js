// calculadoraPrecios.js
const IVA = 0.21;

function sumarIva(precioBase) {
    return precioBase * (1 + IVA);
}

function calcularDescuento(precio, porcentaje) {
    const montoDescuento = (precio * porcentaje) / 100;
    return precio - montoDescuento;
}

// Hacemos que nuestras funciones sean públicas exportándolas.
// Asignamos un objeto a module.exports con lo que queremos exponer.
module.exports = {
    sumarIva: sumarIva,
    calcularDescuento: calcularDescuento,
};

// Forma corta (si la clave y el valor tienen el mismo nombre):
// module.exports = { sumarIva, calcularDescuento };
