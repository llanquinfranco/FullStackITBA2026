const contrasenaCorrecta = "Jota123";
let contrasenaIngresada = prompt('Por favor, ingrese su contraseña:');

if (contrasenaIngresada === contrasenaCorrecta) {
    alert('¡Acceso concedido!');
} else if (contrasenaIngresada === "") {
    alert('No se ingresó ninguna contraseña');
} else {
    alert('Contraseña incorrecta. Acceso denegado');
}
