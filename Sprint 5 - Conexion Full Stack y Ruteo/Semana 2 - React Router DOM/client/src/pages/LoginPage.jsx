import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({setIsLoggedIn}) {
    const [formulario, setFormulario] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario((estadoPrevio) => ({
            ...estadoPrevio,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(formulario.email.trim() !== "" && formulario.password.trim() !== "") {
            setIsLoggedIn(true);
            navigate("/dashboard");
        } else {
            alert("Por favor, completa todos los campos.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Iniciar Sesion</h3>
            <input type="email" name="email" value={formulario.email} onChange={handleChange} placeholder="Introduzca su Email" required />
            <input type="password" name="password" value={formulario.password} onChange={handleChange}  placeholder="Introduzca su Contraseña" required></input>
            <button type="submit">Ingresar</button>
        </form>
    );
}

export default LoginPage;
