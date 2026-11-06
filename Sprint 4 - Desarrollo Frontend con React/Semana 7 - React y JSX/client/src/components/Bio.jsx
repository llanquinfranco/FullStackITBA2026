const usuario = {
    nombre: "David Gilmour",
    avatarURL: "https://cdn.uc.assets.prezly.com/3d0e79ff-c8c1-42e3-8093-53291cc9e55e/david-gilmour-pf-fr33-earls-court-19-5-73-jill-furmanovsky.jpg", // URL de una imagen de prueba
    trabajo: "Guitarrista y cantante de Pink Floyd",
};

const cardStyles = {
    border: "2px solid #eee",
    borderRadius: "10px",
    padding: "15px",
    textAlign: "center",
    width: "400px",
};

function Bio() {
    return (
        <div style={cardStyles}>
            <img src={usuario.avatarURL} alt="Avatar" style={{maxWidth: "100%"}}/>
            <h1>{usuario.nombre}</h1>
            <p>{usuario.trabajo}</p>
        </div>
    );
}

export default Bio;
