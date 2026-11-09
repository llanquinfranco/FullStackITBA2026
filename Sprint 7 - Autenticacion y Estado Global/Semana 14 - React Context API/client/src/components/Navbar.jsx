import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Navbar() {

    const { currentUser, logout } = useContext(AuthContext);
    
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
        </nav>
    );
}

export default Navbar;
