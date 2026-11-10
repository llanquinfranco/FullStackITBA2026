import { createContext, useState } from 'react';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    
    const [cartItems, setCartItems] = useState([]);
    
    function addItemToCart(producto) {
        setCartItems((prevCarrito) => {
            const productoExistente = prevCarrito.find((item) => item.id == producto.id);
            if (productoExistente) {
                return prevCarrito.map((item) => (item.id == producto.id ? { ...item, cantidad: (item.cantidad || 1) + 1 } : item));
            }
            // Si es nuevo, lo agregamos con cantidad inicial en 1
            return [...prevCarrito, { ...producto, cantidad: 1 }];
        });
    }
    
    function clearCart() {
        setCartItems([]);
    }
    
    const value = { cartItems, addItemToCart, clearCart };
    
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};