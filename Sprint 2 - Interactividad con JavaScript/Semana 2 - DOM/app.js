// Ejercicio 1: Catálogo de Productos Dinámico

const catalogoMuebles = [
    {
        id: 1,
        nombre: 'Biblioteca',
        precio: 90000,
        imagenURL: 'https://ciudad-muebles.com.ar/wp-content/uploads/2024/07/438-NAT-BLA.jpg'
    },
    {
        id: 2,
        nombre: 'Sillon',
        precio: 675000,
        imagenURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0btwRkX71lWeGS08CPMpQYcJgAFjeQ7kaTP_FSsvdwpGdW7n5WUwlbkc&s=10://ciudad-muebles.com.ar/wp-content/uploads/2024/07/438-NAT-BLA.jpg'
    },
    {
        id: 3,
        nombre: 'Mesa',
        precio: 1030000,
        imagenURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWpj5fPFO2V9umoi-jvWdOfv7k6cy4ONcaE0wWaZlj-yvSkudbU06QRaDF&s=10ciudad-muebles.com.ar/wp-content/uploads/2024/07/438-NAT-BLA.jpg'
    }
]

const contenedor = document.querySelector('#product-container');

catalogoMuebles.forEach(mueble => {
    const nuevoDiv = document.createElement('div');
    nuevoDiv.classList.add('product-card');

    const nuevoH3 = document.createElement('h3');
    nuevoH3.textContent = mueble.nombre;

    const nuevoP = document.createElement('p');
    nuevoP.textContent = mueble.precio;

    const nuevoIMG = document.createElement('img');
    nuevoIMG.src = mueble.imagenURL;

    nuevoDiv.appendChild(nuevoH3);
    nuevoDiv.appendChild(nuevoP);
    nuevoDiv.appendChild(nuevoIMG);

    contenedor.appendChild(nuevoDiv);
});

// Ejercicio 2: Botón de "Añadir a Favoritos"

const botonFavorito = document.querySelector('button');
botonFavorito.addEventListener('click', function () {
    botonFavorito.classList.toggle('favorito');
    if (botonFavorito.className === 'favorito') {
        botonFavorito.textContent = '⭐ Quitar de Favoritos';
    } else {
        botonFavorito.textContent = '❤️ Añadir a Favoritos';
    }
});

// Ejercicio 3: Guardar y Cargar Preferencias con JSON

const preferenciasUsuario = {
    tema: 'oscuro',
    idioma: 'es',
    notificaciones: true
};

const botonGuardar = document.querySelector('#btn-guardar');
botonGuardar.addEventListener('click', function () {
    let stringJSON = JSON.stringify(preferenciasUsuario);
    localStorage.setItem('misPreferencias', stringJSON);
    alert('Preferencias guardadas');
});

const botonCargar = document.querySelector('#btn-cargar');
botonCargar.addEventListener('click', function () {
    stringJSON = localStorage.getItem('misPreferencias');
    let stringObjeto = JSON.parse(stringJSON);
    console.log('Objeto recuperado: ', stringObjeto);
});

// Ejercicio 4: Buscador de Usuarios de una API

const formulario = document.querySelector('form');
formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    const nombreInput = document.querySelector('input').value;
    buscarUsuario(nombreInput);
});

async function buscarUsuario(stringInput) {
    try {
        const url = `https://jsonplaceholder.typicode.com/users?username=${stringInput}`
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: El estado es ${respuesta.status}`);
        }
        const datosUsuario = await respuesta.json();
        const contenedorUsuario = document.querySelector('#contenedor-usuario');
        
        // Vaciamos el contenedor antes de procesar los resultados
        contenedorUsuario.innerHTML = '';
        
        if (datosUsuario.length > 0) {
            const usuario = datosUsuario[0];
            
            let nuevoP = document.createElement('p');
            nuevoP.textContent = `Nombre: ${usuario.name}`;
            contenedorUsuario.appendChild(nuevoP);
            
            nuevoP = document.createElement('p');
            nuevoP.textContent = `Email: ${usuario.email}`;
            contenedorUsuario.appendChild(nuevoP);
            
            nuevoP = document.createElement('p');
            nuevoP.textContent = `Ciudad: ${usuario.address.city}`;
            contenedorUsuario.appendChild(nuevoP);
            
        } else {
            const mensajeError = document.createElement('p');
            mensajeError.textContent = 'Usuario no encontrado';
            contenedorUsuario.appendChild(mensajeError);
        }
    } catch (error) {
        console.error("No se pudo obtener el usuario: ", error);
    }
}

// Ejercicio 5: Galería de Fotos Asíncrona con Eventos

crearGaleria();

async function crearGaleria() {
    try {
        const url = "https://jsonplaceholder.typicode.com/photos?_limit=12";
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: El estado es ${respuesta.status}`);
        }
        
        const arrayFotos = await respuesta.json();
        const contenedorGaleria = document.querySelector('#contenedor-galeria');
        
        arrayFotos.forEach(foto => {
            const img = document.createElement('img'); 
            img.src = foto.thumbnailUrl;
            //img.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfW1Fb06pCmx515uBcKB0f4YGFNuLtydfkrqeU-6KE9w&s=10';
            img.alt = foto.title;
            
            img.addEventListener('click', function() {
                alert(foto.title);
            });
            
            contenedorGaleria.appendChild(img);
        });
    } catch (error) {
        console.error("No se pudo obtener el usuario: ", error);
    }
}
