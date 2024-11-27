import { getElementCenter, lengthAndAngle } from '../enunciado/src/lib/line_position.js'
import { palabraCompletada } from './revelarPalabras.js'

let origen;
let lineaDiv;
let palabra = '';
let manejarMouseMove;

/* Finaliza la linea si es fijada o si se levanta el ratón*/
function finalizarLinea(final) {
    const { length, angle } = lengthAndAngle(origen, final);
    lineaDiv.style.width = `${length}px`;
    lineaDiv.style.transform = `rotate(${angle}deg)`;
}

/* Fija la linea de centro a centro */
function fijarLineaRecta(letraSiguiente){
    const centroLetra = getElementCenter(letraSiguiente);
    let final = [centroLetra.x, centroLetra.y];
    finalizarLinea(final);

    return centroLetra;
}

/* Crea un div que será la línea amarilla que vaya de letra a letra */
function iniciarLinea(centroLetra){
    lineaDiv = document.createElement("div"); 
    lineaDiv.classList.add("line"); 
    document.body.appendChild(lineaDiv);

    origen = [centroLetra.x, centroLetra.y]; 
    lineaDiv.style.left = `${origen[0]}px`; 
    lineaDiv.style.top = `${origen[1]}px`; 
}

/* Añade la letra seleccionada a la palabra */
function añadirLetraAPalabra(letra){
    letra.classList.add("selected");
    palabra += letra.firstChild.nodeValue.trim();
}

/* Envia cual es la letra seleccionada */
function gestionSeleccionarLetras(letra, centroLetra){
    añadirLetraAPalabra(letra);
    iniciarLinea(centroLetra);
}

/* Gestiona la selección de otra letra */
function seleccionarLetraSiguiente(event) {
    let letraSiguiente = event.currentTarget;
    if (letraSiguiente.classList.contains("selected")) return; // No seleccionar letras repetidas

    let centroLetra = fijarLineaRecta(letraSiguiente); /* Fijar linea si pasa por encima de otra letra*/
    gestionSeleccionarLetras(letraSiguiente, centroLetra);
}

/* Gestión de mover el ratón por encima de una letra o no */
manejarMouseMove = (event) => {
    let letrasRueda = document.getElementsByClassName("wheel-letter");

    for (let letraRueda of letrasRueda){
        if (!letraRueda.classList.contains("selected")) {  /* Si al mover el ratón, pasa por una letra que no ha pasado antes */
            letraRueda.addEventListener("mouseover", seleccionarLetraSiguiente);     
        } 
        else {
            let final = [event.clientX, event.clientY];
            finalizarLinea(final);
        }
    }
}

/* Seleccionar letra */
function seleccionarLetraInicial(event){
    let letra = event.currentTarget;
    const centroLetra = getElementCenter(letra);
    gestionSeleccionarLetras(letra, centroLetra)

    /* Al mover el ratón, la línea se actualizará */
    document.addEventListener("mousemove", manejarMouseMove);
    
}

/* Elimina los manejadores */
function quitarManejadores(){
    const letras = document.querySelectorAll(".wheel-letter");
    for(let letra of letras){
        letra.classList.remove("selected")
        letra.removeEventListener("mouseover", seleccionarLetraSiguiente);
    }
    document.removeEventListener("mousemove", manejarMouseMove);
}

/* Elimina las lineas amarillas */
function eliminarDivLineas(){
    const lineas = document.querySelectorAll(".line");
    for(let linea of lineas){
        linea.remove();
    }
}

/* Gestiona cuando se ha finalizado la selección de la palabra (levantar el mouse) */
function finalizarSeleccionPalabra(game){
    quitarManejadores();
    eliminarDivLineas();

    if (palabra){
        palabraCompletada(game, palabra);
        palabra = '';
    }
}

/* Añade un manejador a cada letra por si selecciona */
function manejarSeleccionLetras(game){
    const letrasRueda = document.getElementsByClassName('wheel-letter');
    for(let letra of letrasRueda){
        letra.addEventListener("mousedown", seleccionarLetraInicial);   
    }
    window.addEventListener("mouseup", () => finalizarSeleccionPalabra(game)); 

}

export { manejarSeleccionLetras };
