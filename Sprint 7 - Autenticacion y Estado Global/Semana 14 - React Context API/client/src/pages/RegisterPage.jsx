import { useState } from "react";

function RegisterPage() {
    const [formData, setFormData] = useState({
        username: "",
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
            const response = await fetch("http://localhost:5000/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                alert("Registro exitoso");
                console.log(data);
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            alert(`Error en el registro: ${error.message}`);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" onChange={handleChange} required placeholder="Username" />
                <input type="email" name="email" onChange={handleChange} required placeholder="Email" />
                <input type="password" name="password" onChange={handleChange} required placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </>
    );
}

export default RegisterPage;
