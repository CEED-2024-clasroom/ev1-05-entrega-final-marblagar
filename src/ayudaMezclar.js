
import { posicionarLetras } from './gestionarRueda.js'

/* Obtiene otras posiciones distintas y modifica los atributos de estilo de los divs que contienen las letras */
function mezclarLetras(){
    const posicionesLetras = posicionarLetras(true);
    const letrasRueda = document.querySelectorAll(".wheel-letter");

    for (let i = 0; i < letrasRueda.length; i++){
        letrasRueda[i].style.left = posicionesLetras[i].left;
        letrasRueda[i].style.top = posicionesLetras[i].top;
    }
}

/* Manejador para mezclar la posición de las letras de la rueda */
function ayudaMezcla(){
    const mezcla = document.querySelector(".fa-shuffle").parentElement;
    mezcla.addEventListener("click", mezclarLetras);   
}

export { ayudaMezcla }