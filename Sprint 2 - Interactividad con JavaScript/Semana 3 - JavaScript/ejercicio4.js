let cantidadProductos = prompt('¿Cuantos productos desea agregar a la lista?');
cantidadProductos = parseInt(cantidadProductos);

for (let i = 0; i < cantidadProductos; i++) {
    console.log(`Producto #${i + 1} agregado`);
}

console.log(`Se han agregado ${cantidadProductos} productos a la lista`);