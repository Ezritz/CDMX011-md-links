// file sistem 'fs'
const fs = require('fs');

// funcion sincrona, va a tomar proceso principal de nodejs y al terminar, seguira ejecutando el codigo
// const files = fs.readdirSync('./');

fs.readdir('./', (error, files) => {
    if (error) {
        throw error;
    }
    console.log(files);
    
});



