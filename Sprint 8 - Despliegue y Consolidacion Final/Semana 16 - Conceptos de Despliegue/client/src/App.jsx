import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import ProductoDetalle from "./pages/ProductoDetalle.jsx";
import ProductoForm from "./pages/ProductoForm.jsx";
import Carrito from "./pages/Carrito.jsx";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import Perfil from "./pages/Perfil.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
    
    return (
        <>
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Catalogo />} />
                    <Route path="/productos/:id" element={<ProductoDetalle />} />
                    <Route path="/carrito" element={<Carrito />} />
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
                    <Route path="/registro" element={<Registro />} />
                    <Route
                        path="/perfil"
                        element={
                            <ProtectedRoute>
                                <Perfil />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<p>Página no encontrada</p>} />
                </Routes>
            </main>
        </>
    );
}
