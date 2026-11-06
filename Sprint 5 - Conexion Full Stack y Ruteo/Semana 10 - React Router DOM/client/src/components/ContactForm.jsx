import { useState } from "react";


function ContactForm() {
    
    const [formulario, setFormulario] = useState({
        email: "",
        message: "",
    });
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormulario(estadoPrevio => ({
            ...estadoPrevio,
            [name]: value
        }));
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Datos a enviar:", formulario);
        
        setFormulario({
            email: "",
            message: "",
        });
    };
    
    
    return(
        <form onSubmit={handleSubmit}>
            <h3>Formulario de Contacto Controlado</h3>
            <input type="email" name="email" value={formulario.email} onChange={handleChange} placeholder="Introduzca su Email" required/>
            <textarea name="message" value={formulario.message} onChange={handleChange}  minLength={15} required></textarea>
            <button type="submit">Ingresar</button>
            
        </form>
    );
}

export default ContactForm;