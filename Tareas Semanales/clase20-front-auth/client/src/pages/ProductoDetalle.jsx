import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function ProductoDetalle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(null);
    const { token, usuario } = useAuth();
    const { agregarAlCarrito } = useCart();

    useEffect(() => {
        async function cargar() {
            try {
                const respuesta = await fetch(`${API}/api/productos/${id}`);
                if (!respuesta.ok) throw new Error("Producto no encontrado");
                setProducto(await respuesta.json());
            } catch (err) {
                setError(err.message);
            }
        }
        cargar();
    }, [id]);

    async function eliminar() {
        if (!window.confirm(`¿Eliminar "${producto.nombre}"?`)) return;
        const respuesta = await fetch(`${API}/api/productos/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!respuesta.ok) {
            const datos = await respuesta.json();
            setError(datos.mensaje || "No se pudo eliminar");
            return;
        }
        navigate("/");
    }

    if (error) return <p className="error">{error}</p>;
    if (!producto) return <p>Cargando…</p>;

    return (
        <section className="detalle">
            <h1>{producto.nombre}</h1>
            <p>{producto.descripcion}</p>
            <p className="precio">${producto.precio}</p>
            <p>Stock: {producto.stock}</p>
            <div className="acciones">
                <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
                {usuario?.rol === "admin" && (
                    <>
                        <Link to={`/admin/editar-producto/${id}`}>Editar</Link>
                        <button className="peligro" onClick={eliminar}>
                            Eliminar
                        </button>
                    </>
                )}
            </div>
        </section>
    );
}
