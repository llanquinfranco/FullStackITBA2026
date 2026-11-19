import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import ProductoDetalle from "./pages/ProductoDetalle.jsx";
import ProductoForm from "./pages/ProductoForm.jsx";
import Carrito from "./pages/Carrito.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
    // El carrito vive en App y baja por props (prop drilling).
    const [carrito, setCarrito] = useState(() => JSON.parse(localStorage.getItem("carrito")) || []);

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    function agregarAlCarrito(producto) {
        setCarrito((actual) => {
            const existe = actual.find((item) => item._id === producto._id);
            if (existe) {
                return actual.map((item) => (item._id === producto._id ? { ...item, cantidad: item.cantidad + 1 } : item));
            }
            return [...actual, { _id: producto._id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 }];
        });
    }

    function vaciarCarrito() {
        setCarrito([]);
    }

    const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);

    return (
        <>
            <Navbar cantidad={cantidadTotal} />
            <main>
                <Routes>
                    <Route path="/" element={<Catalogo onAgregar={agregarAlCarrito} />} />
                    <Route path="/productos/:id" element={<ProductoDetalle onAgregar={agregarAlCarrito} />} />
                    <Route path="/carrito" element={<Carrito carrito={carrito} onVaciar={vaciarCarrito} />} />
                    <Route
                        path="/admin/crear-producto"
                        element={
                            <ProtectedRoute soloAdmin>
                                <ProductoForm key="crear" />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/editar-producto/:id"
                        element={
                            <ProtectedRoute soloAdmin>
                                <ProductoForm key="editar" />
                            </ProtectedRoute>
                        }
                    />
                    
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<p>Página no encontrada</p>} />
                </Routes>
            </main>
        </>
    );
}
