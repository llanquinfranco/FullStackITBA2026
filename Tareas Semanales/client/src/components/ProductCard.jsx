function ProductCard({nombre, precio, imagen}) {
    return (
        <article className="producto-card">
            <img src={imagen} alt={nombre} />
            <h3>{nombre}</h3>
            <p className="precio">${precio.toLocaleString("es-AR")}</p>
            <button>Agregar al carrito</button>
        </article>
    );
}

export default ProductCard;
