import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import NuevoProductoForm from "./components/NuevoProductoForm";

const API = "http://localhost:3000/api/productos";

function App() {
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarProductos() {
      try {
        const respuesta = await fetch(API);
        if (!respuesta.ok) {
          throw new Error("No se pudo cargar el catálogo");
        }
        const datos = await respuesta.json();
        setProductos(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();
  }, []);

  function agregarAlCarrito(producto) {
    setCarrito([...carrito, producto]);
  }

  function sumarProducto(nuevo) {
    setProductos([...productos, nuevo]);
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
        <NuevoProductoForm onCreado={sumarProducto} />
      </main>
    </>
  );
}

export default App;
