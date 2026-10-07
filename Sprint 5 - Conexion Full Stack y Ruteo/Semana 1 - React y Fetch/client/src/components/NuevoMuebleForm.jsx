import { useState } from "react";

function NuevoMuebleForm() {
    const [entrada, setEntrada] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    title: entrada,
                    body: "Contenido de ejemplo",
                    userId: 1,
                }),
            });

            if (!response.ok) {
                throw new Error("Falló la creación del post");
            }
            
            const data = await response.json();
            alert(`¡Post creado con ID: ${data.id}!`);
            setEntrada("");
            
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={entrada} onChange={(e) => setEntrada(e.target.value)} placeholder="Nombre del mueble" required />
                <button type="submit">Crear Producto</button>
            </form>
        </>
    );
}

export default NuevoMuebleForm;
