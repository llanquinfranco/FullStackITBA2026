import { catalogo } from "./datos.js";

const contenedorCatalogo = document.querySelector("#contenedor-catalogo");

mostrarProductos(catalogo);

// Grilla de tarjetas de productos
function mostrarProductos(arrayMuebles) {

    contenedorCatalogo.innerHTML = "";
    
    arrayMuebles.forEach((mueble) => {
        const divProducto = document.createElement("div");
        divProducto.classList.add("tarjeta-producto");

        // Cada producto detalla su enlace
        //tiene que ser el mismo arraycatalogo, con import??
        divProducto.addEventListener("click", function () {
            window.location.href = `producto.html?id=${mueble.id}`;
        });

        const nombre = document.createElement("h2");
        nombre.textContent = mueble.nombre;
        divProducto.appendChild(nombre);

        const imagen = document.createElement("img");
        imagen.src = mueble.imagenURL;
        divProducto.appendChild(imagen);

        const descripcion = document.createElement("p");
        descripcion.textContent = mueble.descripcion;
        divProducto.appendChild(descripcion);

        contenedorCatalogo.appendChild(divProducto);
    });
}

// Campo de Búsqueda
const inputBuscador = document.querySelector("#buscador");

inputBuscador.addEventListener("input", function (evento) {
    const textoBuscado = evento.target.value.toLowerCase();

    const resultadosFiltrados = catalogo.filter(function (mueble) {
        const nombreMueble = mueble.nombre.toLowerCase();
        const categoriaMueble = mueble.categoria.toLowerCase();
        if (nombreMueble.startsWith(textoBuscado) || categoriaMueble.startsWith(textoBuscado)) {
            return true;
        } else {
            return false;
        }
    });
    mostrarProductos(resultadosFiltrados);
});
