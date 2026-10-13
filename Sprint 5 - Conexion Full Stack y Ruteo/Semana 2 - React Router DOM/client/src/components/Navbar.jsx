import { Link } from "react-router-dom";

function Navbar() {
    return(
        <nav>
            <Link to={"/"}>Inicio</Link>
            <Link to={"/articles"}>Articulos</Link>
            <Link to={"/contact"}>Contacto</Link>
        </nav>
    );
}

export default Navbar;