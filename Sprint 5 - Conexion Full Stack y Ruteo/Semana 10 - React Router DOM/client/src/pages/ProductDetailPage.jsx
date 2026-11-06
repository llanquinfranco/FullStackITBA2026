import { useParams } from "react-router-dom";

function ProductDetailPage() {
    const { productId } = useParams();

    const catalogo = [
        { id: 1, nombre: "Aparador Uspallata", precio: 850000 },
        { id: 2, nombre: "Biblioteca Recoleta", precio: 620000 },
        { id: 3, nombre: "Butaca Mendoza", precio: 450000 },
        { id: 4, nombre: "Sillón Copacabana", precio: 780000 },
        { id: 5, nombre: "Mesa de Centro Araucaria", precio: 510000 },
        { id: 6, nombre: "Mesa de Noche Aconcagua", precio: 290000 },
    ];

    const producto = catalogo.find((item) => item.id === Number(productId));

    return (
        <div>
            <h2>Detalles del Producto ID: {productId}</h2>
            {producto ? (
                <div>
                    <p>
                        <strong>Nombre:</strong> {producto.nombre}
                    </p>
                    <p>
                        <strong>Precio:</strong> ${producto.precio.toLocaleString()}
                    </p>
                </div>
            ) : (
                <p>El producto no existe.</p>
            )}
        </div>
    );
}

export default ProductDetailPage;
