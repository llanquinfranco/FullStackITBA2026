import { useState } from "react";

function NewArticleForm() {
    const [formulario, setFormulario] = useState({
        titulo: "",
        contenido: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario((estadoPrevio) => ({
            ...estadoPrevio,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    title: formulario.titulo,
                    body: formulario.contenido,
                    userId: 1,
                }),
            });

            if (!response.ok) {
                throw new Error("Falló la creación del post");
            }

            const data = await response.json();
            alert(`¡Post creado con ID: ${data.id}!`);
            setFormulario({
                titulo: "",
                contenido: "",
            });
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Formulario de Creacion de Articulo</h3>
            <input type="text" name="titulo" value={formulario.titulo} onChange={handleChange} placeholder="Introduzca Titulo del Articulo" required />
            <textarea name="contenido" value={formulario.contenido} onChange={handleChange} minLength={15} placeholder="Introduzca Contenido del Articulo" required></textarea>
            <button type="submit">Crear</button>
        </form>
    );
}

export default NewArticleForm;
