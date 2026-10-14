import { Link } from "react-router-dom";

function ProductsPage() {
    
    
    
    const catalogo = [
        {
            id: 1,
            nombre: "Aparador Uspallata",
            precio: 850000,
        },
        {
            id: 2,
            nombre: "Biblioteca Recoleta",
            precio: 620000,
        },
        {
            id: 3,
            nombre: "Butaca Mendoza",
            precio: 450000,
        },
        {
            id: 4,
            nombre: "Sillón Copacabana",
            precio: 780000,
        },
        {
            id: 5,
            nombre: "Mesa de Centro Araucaria",
            precio: 510000,
        },
        {
            id: 6,
            nombre: "Mesa de Noche Aconcagua",
            precio: 290000,
        },
    ];
    
    
    return(
        <>
            <h1>Lista de productos</h1>
            <ul>
                {catalogo.map((producto) => (
                    <li key={producto.id}>
                        <Link to={`/products/${producto.id}`}>{producto.nombre}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ProductsPage;
