import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";

const API = "http://localhost:3000/api/productos";

function App() {
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudo cargar el catálogo");
        }
        return respuesta.json();
      })
      .then((datos) => setProductos(datos))
      .catch((error) => setError(error.message))
      .finally(() => setCargando(false));
  }, []);

  function agregarAlCarrito(producto) {
    setCarrito([...carrito, producto]);
  }

  return (
    <>
      <Navbar cantidad={carrito.length} />
      <main>
        <h2 className="subtitulo">Nuestros productos</h2>
        {cargando && <p>Cargando productos...</p>}
        {error && <p>No pudimos cargar el catálogo: {error}</p>}
        {!cargando && !error && (
          <ProductList productos={productos} onAgregar={agregarAlCarrito} />
        )}
      </main>
    </>
  );
}

export default App;
