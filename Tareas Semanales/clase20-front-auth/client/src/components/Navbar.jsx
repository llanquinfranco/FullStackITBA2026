import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ cantidad }) {
    const { usuario, logout } = useAuth();
    return (
        <nav className="navbar">
            <Link to="/" className="marca">
                Mueblería Hermanos Jota
            </Link>
            <div className="links">
                <Link to="/">Catálogo</Link>
                {usuario?.rol === "admin" && <Link to="/admin/crear-producto">Nuevo producto</Link>}

                <Link to="/carrito">Carrito ({cantidad})</Link>

                {usuario ? (
                    <>
                        <span>Hola, {usuario.nombre}</span>
                        <button type="button" onClick={logout}>
                            Cerrar sesión
                        </button>
                    </>
                ) : (
                    <Link to="/login">Ingresar</Link>
                )}
            </div>
        </nav>
    );
}
