import { useState } from "react";

function Tienda() {
    const discos = [
        { id: 1, nombre: "Taylor Swift", precio: 25000 },
        { id: 2, nombre: "Fearless", precio: 28000 },
        { id: 3, nombre: "Speak Now", precio: 28000 },
        { id: 4, nombre: "Red", precio: 30000 },
        { id: 5, nombre: "1989", precio: 30000 },
        { id: 6, nombre: "Reputation", precio: 27000 },
        { id: 7, nombre: "Lover", precio: 27000 },
        { id: 8, nombre: "Folklore", precio: 27000 },
        { id: 9, nombre: "Evermore", precio: 27000 },
        { id: 10, nombre: "Midnights", precio: 29000 },
        { id: 11, nombre: "The Tortured Poets Department", precio: 32000 },
        { id: 12, nombre: "The Life of a Showgirl", precio: 34000 },
    ];

    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (disco) => {
        setCarrito([...carrito, disco]);
    };
    
    const precioTotal = carrito.reduce((acumulador, item) => acumulador + item.precio, 0);

    return (
        <>
            {/* Catalogo */}
            <div>
                {discos.map((disco) => (
                    <div key={disco.id}>
                        <h3>{disco.nombre}</h3>
                        <p>{disco.precio}</p>
                        <button onClick={() => agregarAlCarrito(disco)}>Agregar al Carrito</button>
                    </div>
                ))}
            </div>
            {/* Carrito */}
            <div>
                <h2>Carrito de Compra</h2>
                { carrito.length === 0 ? 
                    <p>El carrito esta vacio</p>
                :
                    <div>
                        <ul>
                            {carrito.map((item, index) => (
                                <li key={index}>
                                    {item.nombre} - {item.precio}
                                </li>
                            ))}
                        </ul>
                        <h3>Total: {precioTotal}</h3>
                    </div>
                }
            </div>
        </>
    );
}

export default Tienda;
