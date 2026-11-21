import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../api.js";
import {useAuth} from "../context/AuthContext.jsx";

const VACIO = { nombre: "", descripcion: "", precio: "", stock: 0, imagenUrl: "" };

export default function ProductoForm() {
    const { id } = useParams(); // con id: editar; sin id: crear
    const navigate = useNavigate();
    const [form, setForm] = useState(VACIO);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        if (!id) return;
        fetch(`${API}/api/productos/${id}`)
            .then((respuesta) => respuesta.json())
            .then((producto) => setForm(producto));
    }, [id]);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        const respuesta = await fetch(id ? `${API}/api/productos/${id}` : `${API}/api/productos`, {
            method: id ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(form),
        });
        const datos = await respuesta.json();
        if (!respuesta.ok) {
            setError(datos.mensaje || "No se pudo guardar");
            return;
        }
        navigate(`/productos/${datos._id}`);
    }

    return (
        <section>
            <h1>{id ? "Editar producto" : "Nuevo producto"}</h1>
            <form onSubmit={handleSubmit} className="formulario">
                <label>
                    Nombre <input name="nombre" value={form.nombre} onChange={handleChange} />
                </label>
                <label>
                    Descripción <textarea name="descripcion" value={form.descripcion} onChange={handleChange} />
                </label>
                <label>
                    Precio <input name="precio" type="number" value={form.precio} onChange={handleChange} />
                </label>
                <label>
                    Stock <input name="stock" type="number" value={form.stock} onChange={handleChange} />
                </label>
                {error && <p className="error">{error}</p>}
                <button type="submit">Guardar</button>
            </form>
        </section>
    );
}
