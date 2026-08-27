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
    const nuevoDiv = document.createElement('div')
    nuevoDiv.classList.add('product-card');
    
    const nuevoH3 = document.createElement('h3');
    nuevoH3.textContent = mueble.nombre;
    
    const nuevoP = document.createElement('p');
    nuevoP.textContent = mueble.precio;
    
    const nuevoIMG = document.createElement('img');
    nuevoIMG.src = mueble.imagenURL;
    
    nuevoDiv.appendChild(nuevoH3);;
    nuevoDiv.appendChild(nuevoP);;
    nuevoDiv.appendChild(nuevoIMG);;
    
    contenedor.appendChild(nuevoDiv);
    
});

const botonFavorito = document.querySelector('button');
botonFavorito.addEventListener('click', function() {
    botonFavorito.classList.toggle('favorito');
    if(botonFavorito.className === 'favorito') {
        botonFavorito.textContent = '⭐ Quitar de Favoritos';
    } else {
        botonFavorito.textContent = '❤️ Añadir a Favoritos';
    }
});

const preferenciasUsuario = {
    tema: 'oscuro',
    idioma: 'es',
    notificaciones: true
};

const botonGuardar = document.querySelector('#btn-guardar');
botonGuardar.addEventListener('click', function() {
    let stringJSON = JSON.stringify(preferenciasUsuario);
    localStorage.setItem('misPreferencias', stringJSON);
    alert('Preferencias guardadas');
});

const botonCargar = document.querySelector('#btn-cargar');
botonCargar.addEventListener('click', function() {
    stringJSON = localStorage.getItem('misPreferencias');
    let stringObjeto = JSON.parse(stringJSON);
    console.log('Objeto recuperado: ', stringObjeto);
});
