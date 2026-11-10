import { CartContext } from "../contexts/CartContext";
import { useContext } from "react";

function CartPage() {
    const { cartItems, clearCart } = useContext(CartContext);
    
    const totalPrecio = cartItems.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
    
    return (
        <aside id="panel-carrito">
            <div className="panel-cabecera">
                <h2>Mi carrito</h2>
            </div>
            <div id="panel-contenido">
                {cartItems.length === 0 ? (
                    <p>Tu carrito está vacío.</p>
                ) : (
                    cartItems.map((producto) => (
                        <div className="fila-panel" key={producto.id}>
                            <img src={producto.imagenURL} alt={producto.nombre} />
                            <div className="fila-info">
                                <h4>{producto.nombre}</h4>

                                <p className="fila-subtotal">${(producto.precio * producto.cantidad).toLocaleString("es-AR")}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="panel-pie">
                <h3 id="panel-total">Total: ${totalPrecio.toLocaleString("es-AR")}</h3>
                {cartItems.length > 0 && (
                    <button id="boton-vaciar-panel" className="boton-secundario" onClick={clearCart}>
                        Vaciar Carrito
                    </button>
                )}

                <button className="boton-primario">Ir al Pago</button>
            </div>
        </aside>
    );
}

export default CartPage;
