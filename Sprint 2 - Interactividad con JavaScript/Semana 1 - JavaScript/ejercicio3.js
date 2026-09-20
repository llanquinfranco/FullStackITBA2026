let totalCompra = 0;
let sigueComprando = true;

while(confirm('¿Desea agregar un producto al carrito?')) {
    let valorIngresado = prompt('Ingrese el valor del producto:');
    valorIngresado = parseFloat(valorIngresado);
    if (typeof valorIngresado === 'number' && valorIngresado > 0) {
        totalCompra = totalCompra + valorIngresado;
    }
}

alert(`El total de su compra es: ${totalCompra}`);