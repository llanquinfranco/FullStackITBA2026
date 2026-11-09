import { createContext, useState } from 'react';

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    
    const [currentTheme, setCurrentTheme] = useState("light");
    
    function toggleTheme() {
        setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
    }
    
    const value = { currentTheme, toggleTheme }
    
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};