import { pedirDatos } from "../data/productos.js";
import ProductCard from "../components/ProductCard.jsx";

const mueblesDescargados = await pedirDatos();

function ProductsPage() {
    return (
        <section>
            <h2 id="titulo-catalogo">Nuestro Catalogo</h2>

            <div id="contenedor-catalogo">
                {mueblesDescargados.map((producto) => (
                    <ProductCard key={producto.id} producto={producto} />
                ))}
            </div>
        </section>
    );
}

export default ProductsPage;
