import { useEffect, useState } from "react";

function UserDetail({ userId }) {
    
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
                const data = await response.json();
                setUsuario(data);
            } catch (error) {
                setError(error);
                console.error("Error petching products: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductos();
    }, [userId]);
    
    if (loading) {
        return <h2>Cargando productos...</h2>;
    }

    if (error != null) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <>
            <h3>{usuario.name}</h3>
            <p>{usuario.email}</p>
        </>
    );
    
}

export default UserDetail;
