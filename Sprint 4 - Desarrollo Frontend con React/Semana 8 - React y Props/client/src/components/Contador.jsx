import { useState } from "react";

function Contador() {
    
    const [clics, setClics] = useState(0);
    
    const aumentarClics = () => {
        setClics(clics + 1);
    };
    
    return(
        <>
            <h1>Contador de Clics</h1>
            <h2>{clics}</h2>
            <button onClick={aumentarClics}>
                Haz clic aqui
            </button>
        </>
    );
}

export default Contador;