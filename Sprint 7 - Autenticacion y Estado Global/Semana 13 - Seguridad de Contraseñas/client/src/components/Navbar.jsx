import { Link } from "react-router-dom";

function Navbar({ currentUser, onLogout }) {

    /* Modifica tu componente <Navbar> para que, usando renderizado condicional, muestre
        los enlaces "Login" y "Registro" si currentUser es null, o el nombre del usuario y 
        un botón de "Logout" si currentUser tiene datos */
    return (
        <nav>
            {currentUser ? (
                <>
                    <span>Bienvenido, {currentUser.username}</span>
                    <Link to="/profile">Mi Perfil</Link>
                    <button onClick={onLogout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Registro</Link>
                </>
            )}
        </nav>
    );
}

export default Navbar;
