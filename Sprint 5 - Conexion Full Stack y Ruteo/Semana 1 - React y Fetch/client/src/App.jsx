import "./App.css";
import { useState } from "react";
import Catalogo from "./components/Catalogo.jsx";
import NuevoMuebleForm from "./components/NuevoMuebleForm.jsx";
import UserDetail from "./components/UserDetail.jsx";

function App() {
    
    const [userId, setUserId] = useState(1);

    return (
        <>
            <Catalogo />
            
            <NuevoMuebleForm />
            
            <button onClick={() => setUserId(1)}>Cambiar userId a 1</button>
            <button onClick={() => setUserId(2)}>Cambiar userId a 2</button>
            <button onClick={() => setUserId(3)}>Cambiar userId a 3</button>
            
            <UserDetail userId={userId} />
        </>
        
        
    );
}

export default App;
