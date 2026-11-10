import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";

function Navbar() {

    const { cartItems } = useContext(CartContext);
    const { currentUser, logout } = useContext(AuthContext);
    
    const cantidad = cartItems.reduce((total, item) => total + item.cantidad, 0);
    
    return (
        <nav>
            {currentUser ? (
                <>
                    <span>Bienvenido, {currentUser.username}</span>
                    <Link to="/profile">Mi Perfil</Link>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Registro</Link>
                </>
            )}
            <Link to="/productos">Productos</Link>
            <Link to="/carrito">
                🛒 Carrito ({cantidad})
            </Link>
            
        </nav>
    );
}

export default Navbar;
