import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Registro() {
    const { registrar } = useAuth();
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");
        try {
            await registrar({ nombre, email, password });
            navigate("/", { replace: true });
        } catch (err) {
            setMensaje(err.message);
        }
    };

    return (
        <section>
            <h2>Crear cuenta</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Registrarse</button>
            </form>
            {mensaje && <p className="mensaje-estado">{mensaje}</p>}
            <p>
                ¿Ya tenés cuenta? <Link to="/login">Ingresar</Link>
            </p>
        </section>
    );
}
