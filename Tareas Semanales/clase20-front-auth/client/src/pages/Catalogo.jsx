import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../api.js";
import { useCart } from "../context/CartContext.jsx";

export default function Catalogo() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const { agregarAlCarrito } = useCart();

    useEffect(() => {
        async function cargar() {
            try {
                const respuesta = await fetch(`${API}/api/productos`);
                if (!respuesta.ok) throw new Error("No se pudieron cargar los productos");
                setProductos(await respuesta.json());
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        }
        cargar();
    }, []);

    if (cargando) return <p>Cargando productos…</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <section>
            <h1>Catálogo</h1>
            <div className="grilla">
                {productos.map((producto) => (
                    <article key={producto._id} className="tarjeta">
                        <h2>{producto.nombre}</h2>
                        <p className="precio">${producto.precio}</p>
                        <Link to={`/productos/${producto._id}`}>Ver detalle</Link>
                        <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
                    </article>
                ))}
            </div>
        </section>
    );
}
