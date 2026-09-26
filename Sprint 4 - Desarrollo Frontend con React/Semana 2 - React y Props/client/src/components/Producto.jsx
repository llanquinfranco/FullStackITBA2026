function Producto({imageUrl, nombre, precio}) {
    return(
        <div>
            <img src={imageUrl} alt={nombre} />
            <h3>{nombre}</h3>
            <p>${precio.toLocaleString('es-AR')}</p>
        </div>
    );
}

export default Producto;