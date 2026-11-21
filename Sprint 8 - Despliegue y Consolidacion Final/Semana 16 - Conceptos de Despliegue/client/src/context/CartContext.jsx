import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [carrito, setCarrito] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("carrito")) || [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    function agregarAlCarrito(producto) {
        setCarrito((actual) => {
            const existe = actual.find((item) => item._id === producto._id);
            if (existe) {
                return actual.map((item) => (item._id === producto._id ? { ...item, cantidad: item.cantidad + 1 } : item));
            }
            return [
                ...actual,
                {
                    _id: producto._id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    cantidad: 1,
                },
            ];
        });
    }

    function vaciarCarrito() {
        setCarrito([]);
    }

    const cantidadTotal = carrito.reduce((acum, item) => acum + item.cantidad, 0);
    const total = carrito.reduce((acum, item) => acum + item.precio * item.cantidad, 0);

    const value = {
        carrito,
        agregarAlCarrito,
        vaciarCarrito,
        cantidadTotal,
        total,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    return useContext(CartContext);
}
