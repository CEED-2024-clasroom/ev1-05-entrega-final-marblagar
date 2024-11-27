import calculateLetterPositions from '../enunciado/src/lib/letter_positions.js'
import { manejarSeleccionLetras } from './seleccionarLetras.js'

/* CREACIÓN DE LA RUEDA Y LAS LETRAS */
let arrayLetras;

/* Posicionar letras en la rueda */
function posicionarLetras(cambiarPosiciones){
    let posicionesLetras = calculateLetterPositions(arrayLetras.length);

    if (cambiarPosiciones === true){
        posicionesLetras = posicionesLetras.sort(() => Math.random() - 0.5);
    }

    return posicionesLetras;
}

/* Crea las letras en la rueda */
function crearLetras(posicionesLetras, arrayLetras){

    let cadenaDivs = '';
    for (let i = 0; i < arrayLetras.length; i++){
        cadenaDivs += `<div class="wheel-letter" style="left: ${posicionesLetras[i].left}; top: ${posicionesLetras[i].top};"> ${arrayLetras[i]} </div>`  
    }
    return cadenaDivs;
}

/* Pinta las letras en la rueda */
function pintarLetras(arrayLetras){
    const contenedorRueda = document.getElementById("wheel");
    contenedorRueda.innerHTML = crearLetras(posicionarLetras(false), arrayLetras);
}

/*  Mostrar la rueda */
function mostrarRueda(game, letrasDisponibles){
    arrayLetras = letrasDisponibles.split('');
    
    pintarLetras(arrayLetras);
    manejarSeleccionLetras(game);

}

export { mostrarRueda, posicionarLetras };
