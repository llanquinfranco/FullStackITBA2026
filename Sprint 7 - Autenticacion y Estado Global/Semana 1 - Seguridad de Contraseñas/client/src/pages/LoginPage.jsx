import { useState } from "react";

function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                alert("Login exitoso");
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            alert(`Error en el login: ${error.message}`);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" onChange={handleChange} required placeholder="Email" />
                <input type="password" name="password" onChange={handleChange} required placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </>
    );
}

export default LoginPage;
