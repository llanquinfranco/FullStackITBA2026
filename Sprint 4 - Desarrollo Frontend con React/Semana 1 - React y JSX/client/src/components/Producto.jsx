const nombreProducto = "Teclado Mecánico RGB";
const descripcion = "Un teclado increíble para gaming y programación.";
const precio = 125;

function Producto() {
    return(
        <div className="product-card">
            <h3>Nombre del Producto: {nombreProducto}</h3>
            <p>Descripcion: {descripcion}</p>
            <h4>Precio: ${precio.toLocaleString("es-AR")} USD</h4>
        </div>
    );
}

export default Producto;