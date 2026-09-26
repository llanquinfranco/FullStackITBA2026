import { useState } from "react";

function Pregunta() {
    
    const [respuestaVisible, setVisibilidad] = useState(false);
    
    const cambiarVisibilidad = () => {
        setVisibilidad(!respuestaVisible);
    };
    
    
    return(
        <>
            <h3>El tobi es terrible wachin?</h3>
            <button onClick={cambiarVisibilidad}>
                {respuestaVisible ? "Ocultar Respuesta" : "Mostrar Respuesta"}
            </button>
            {respuestaVisible ? <p>Re</p> : null}
        </>
    );
}



export default Pregunta;