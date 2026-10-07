import { useState, useEffect } from "react";

function Catalogo() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=8");
                const data = await response.json();
                setProductos(data);
            } catch (error) {
                setError(error);
                console.error("Error petching products: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductos();
    }, []);

    if (loading) {
        return <h2>Cargando productos...</h2>;
    }

    if (error != null) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <>
            <ul>
                {productos.map((producto) => (
                    <li key={producto.id}>{producto.title}</li>
                ))}
            </ul>
        </>
    );
}

export default Catalogo;
