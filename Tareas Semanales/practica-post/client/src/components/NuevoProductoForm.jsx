import { useState } from "react";

const API = "http://localhost:3000/api/productos";

function NuevoProductoForm({ onCreado }) {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [mensaje, setMensaje] = useState("");

    async function handleSubmit(event) {
        try {
            event.preventDefault();
            const respuesta = await fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nombre, precio }),
            });
            const datos = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(datos.error);
            }

            setMensaje(`Producto creado con id ${datos.id}`);
            setNombre("");
            setPrecio("");
            if (onCreado) {
                onCreado(datos);
            }
        } catch (err) {
            setMensaje(`No se pudo crear: ${err.message}`);
        }
    }

    return (
        <form className="nuevo-producto" onSubmit={handleSubmit}>
            <h3>Nuevo producto</h3>
            <input type="text" placeholder="Nombre" value={nombre} onChange={(event) => setNombre(event.target.value)} />
            <input type="number" placeholder="Precio" value={precio} onChange={(event) => setPrecio(event.target.value)} />
            <button type="submit">Guardar</button>
            {mensaje && <p>{mensaje}</p>}
        </form>
    );
}

export default NuevoProductoForm;
