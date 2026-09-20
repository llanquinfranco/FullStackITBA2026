


function estaDisponible(producto) {
    if(producto.stock > 0) {
        return true;
    } else {
        return false;
    }
}

function obtenerInfo(producto) {
    return `Producto: ${producto.nombre} - Stock: ${producto.stock}`;
}

module.exports = {
    estaDisponible,
    obtenerInfo
};
