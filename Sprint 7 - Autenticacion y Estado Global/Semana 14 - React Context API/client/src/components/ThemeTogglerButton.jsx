import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";


function ThemeTogglerButton() {
    const { toggleTheme } = useContext(ThemeContext);
    
    return(
        <button onClick={toggleTheme}>
            Cambiar Tema
        </button>
    );
}

export default ThemeTogglerButton;