const fs = require("fs");
const date = new Date();

function log(mensaje) {
    const linea = `${date.toLocaleString()} - ${mensaje} \n`;
    fs.appendFile("./sistema.log", linea , (err) => {
        if (err) throw err;
        console.log('Mensaje añadido en "sistema.log"');
    });
}

module.exports = { log };