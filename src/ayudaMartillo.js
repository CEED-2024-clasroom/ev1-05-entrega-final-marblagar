import { atributosCasilla, comprobarCasillaVacia } from './gestionarCasillas.js'

let seleccionarCasilla;
let reiniciarClaseMartillo;
let juegoCreado; // Global game


/* Modifica la clase hidden según un booleano */
function cambiarClaseBlack(accion){
    let divBlack = document.getElementById("black");
    if (accion){
        divBlack.classList.remove("hidden");
    } else {
        divBlack.classList.add("hidden");
    }
}

/* Modifica la clase on-top según un booleano*/
function cambiarClaseCasillas(accion){
    const casillas = document.querySelectorAll(".letter");
    for(let casilla of casillas){
        if (accion){
            casilla.classList.add("on-top");
        } else {
            casilla.classList.remove("on-top");
        }
    }
}

/* Manejador dle martillo al hacer click en él */
function manejarMartillo(event){
    let elementoClick = event.target;
    if (elementoClick.classList.contains("letter")){
        seleccionarCasilla(elementoClick);
    } else {
        reiniciarClaseMartillo();
    }
}

/* Al pulsar el martillo se llamará a dos funciones para añadir el div negro, y una nueva clase a las letras */
function pulsarMartillo(){
    cambiarClaseBlack(true);
    cambiarClaseCasillas(true);
    document.body.addEventListener("mousedown", manejarMartillo);
}

/* Manejador de la ayuda de martillo */
function ayudaMartillo(game){
    juegoCreado = game;
    const martillo = document.querySelector(".fa-hammer").parentElement;
    martillo.addEventListener("click", pulsarMartillo); 
}   

/* Eliminar el manejador al hacer click fuera */
function eliminarManejadorMartillo(){
    document.body.removeEventListener("mousedown", manejarMartillo);
}

reiniciarClaseMartillo = () => {
    cambiarClaseBlack(false); // Volver a poner la clase hidden
    cambiarClaseCasillas(false); // Eliminar on-top de las letras
    eliminarManejadorMartillo(); // Elimina manejador al hacer click fuera
}    

seleccionarCasilla = (casilla) => { 
    let dataX;
    let dataY;

    if (!comprobarCasillaVacia(casilla)){
        return;
    } else {
        [dataX, dataY] = atributosCasilla(casilla); // Selecciona la posición de la casilla
        casilla.textContent = juegoCreado.letterAt(dataX,dataY); // Descubre la letra que está en esa casilla
        reiniciarClaseMartillo(); // Finalizar la ayuda
    }
}    

export { ayudaMartillo }