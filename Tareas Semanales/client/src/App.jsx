import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";

function App() {
    return (
        <>
            <Navbar />
            <main>
                <h2 className="subtitulo">Nuestros productos</h2>
                <section className="catalogo">
                    <ProductList />
                </section>
            </main>
        </>
    );
}

export default App;
