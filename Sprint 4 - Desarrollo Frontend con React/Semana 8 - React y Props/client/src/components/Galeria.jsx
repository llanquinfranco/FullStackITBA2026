import PersonajeCard from "./PersonajeCard";
import "./Galeria.css";

function Galeria() {
    
    const personajes = [
        { id: 1, imagen: "https://static.wikia.nocookie.net/lego-marvelsuperheroes/images/4/42/Iron_Man_%2842%29.png/revision/latest?cb=20250930215656",nombre: "Iron Man", rol: "Genio y Vengador" },
        { id: 2, imagen: "https://static.wikia.nocookie.net/lego-marvelsuperheroes/images/c/c5/Spidey_%281%29.png/revision/latest/scale-to-width/360?cb=20250929183424", nombre: "Spider-Man", rol: "Superhéroe Arácnido" },
        { id: 3, imagen: "https://static.wikia.nocookie.net/lego-marvelsuperheroes/images/f/f9/Cap_%283%29.png/revision/latest?cb=20251001190818", nombre: "Capitán América", rol: "Líder de los Vengadores" },
        { id: 4, imagen: "https://static.wikia.nocookie.net/lego-marvelsuperheroes/images/c/c1/Odinson_%281%29.png/revision/latest/scale-to-width/360?cb=20251002094918", nombre: "Thor", rol: "Dios del Trueno" },
        { id: 5, imagen: "https://static.wikia.nocookie.net/lego-marvelsuperheroes/images/e/e8/The_Hulk_%281%29.png/revision/latest/scale-to-width/360?cb=20251002100913", nombre: "Hulk", rol: "Fuerza Bruta" },
        { id: 6, imagen: "https://static.wikia.nocookie.net/lego-marvelsuperheroes/images/5/59/Black_Widow_%283%29.png/revision/latest/scale-to-width/360?cb=20250929170126", nombre: "Black Widow", rol: "Espía y Estratega" },
    ];
    
    return (
        <div className="galeria-grid">
            {personajes.map(personaje => (
                <PersonajeCard 
                    key={personaje.id}
                    imagen={personaje.imagen}
                    nombre={personaje.nombre}
                    rol={personaje.rol}
                />
            ))}
        </div>
    );
}

export default Galeria;
