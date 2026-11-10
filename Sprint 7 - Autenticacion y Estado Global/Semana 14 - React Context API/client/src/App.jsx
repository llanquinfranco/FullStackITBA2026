import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeContext } from "./contexts/ThemeContext";
import ThemeTogglerButton from "./components/ThemeTogglerButton";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";

function App() {

    const { currentTheme } = useContext(ThemeContext);
    
    return (
        <div className={currentTheme}>
            <h1>Aplicacion con Theme Context</h1>
            <ThemeTogglerButton />
            
            <Navbar />
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/productos" element={<ProductsPage />} />
                <Route path="/carrito" element={<CartPage />} />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
