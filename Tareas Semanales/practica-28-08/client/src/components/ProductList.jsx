import productos from "../data/productos";
import ProductCard from "./ProductCard";

function ProductList() {
    return(
        <section>
            {productos.map((producto) => (
                <ProductCard
                    key={producto.id}
                    nombre={producto.nombre}
                    precio={producto.precio}
                    imagen={producto.imagen}
                />
            ))}
        </section>
    );
}

export default ProductList;