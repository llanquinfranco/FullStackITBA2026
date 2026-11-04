import { useState, useEffect } from "react";
import { jwt_decode } from "jwt-decode"  
import "./App.css";

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    // Este efecto se ejecuta solo una vez, cuando la app carga.
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if(token) {
            try {
                const decodedUser = jwt_decode(token);
                setCurrentUser(decodedUser);
            } catch (error) {
                // Token inválido o expirado, lo borramos
                localStorage.removeItem('authToken');
            }
        }
    }, []);
    
    
    
    return <>
    
    </>;
}

export default App;
