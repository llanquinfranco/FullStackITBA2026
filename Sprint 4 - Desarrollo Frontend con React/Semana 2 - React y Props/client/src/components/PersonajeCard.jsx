import "./Galeria.css";

function PersonajeCard({imagen, nombre, rol}) {

    return(
        <div className="card-personaje">
            <img src={imagen} alt="" />
            <h2>{nombre}</h2>
            <p>{rol}</p>
        </div>
    );
}

export default PersonajeCard;