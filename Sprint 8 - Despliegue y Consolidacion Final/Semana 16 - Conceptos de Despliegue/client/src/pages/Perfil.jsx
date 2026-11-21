import { useEffect, useState } from "react";
import { API } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Perfil() {
    const { logout } = useAuth();
    const [perfil, setPerfil] = useState(null);
    const [mensaje, setMensaje] = useState("Cargando...");

    useEffect(() => {
        const cargarPerfil = async () => {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API}/usuarios/perfil`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.status === 401) {
                logout();
                return;
            }

            const data = await res.json();
            if (!res.ok) {
                setMensaje(data.mensaje || "No se pudo cargar el perfil");
                return;
            }

            setPerfil(data.usuario || data);
            setMensaje("");
        };

        cargarPerfil();
    }, [logout]);

    if (!perfil) return <p className="mensaje-estado">{mensaje}</p>;

    return (
        <section>
            <h2>Mi perfil</h2>
            <p>Nombre: {perfil.nombre}</p>
            <p>Email: {perfil.email}</p>
            <p>Rol: {perfil.rol}</p>
        </section>
    );
}
