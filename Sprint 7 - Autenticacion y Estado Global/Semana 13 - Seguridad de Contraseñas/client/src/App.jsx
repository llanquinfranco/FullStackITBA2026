import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    // Este efecto se ejecuta solo una vez, cuando la app carga.
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("authToken");
            if (token) {
                try {
                    const decodedUser = jwtDecode(token);
                    setCurrentUser(decodedUser);
                } catch (error) {
                    // Token inválido o expirado, lo borramos
                    localStorage.removeItem("authToken");
                    console.log(error);
                }
            }
        };
        checkAuth();
    }, []);

    const handleLoginSuccess = (userData) => {
        setCurrentUser(userData);
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setCurrentUser(null);
    };

    return (
        <>
            <Navbar currentUser={currentUser} onLogout={handleLogout} />
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute currentUser={currentUser}>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
