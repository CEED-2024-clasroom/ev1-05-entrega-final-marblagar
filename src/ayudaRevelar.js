import { atributosCasilla, comprobarCasillaVacia } from './gestionarCasillas.js'

/* Comprueba el numero de letras que quedan por revelar */
function comprobarLetrasSinRevelar(casillas, numLetras){

    let casillaVacia = casilla => !casilla.textContent;
    let cantidadCasillasVacias = Array.from(casillas).filter(casillaVacia).length;

    // Si hay entre 1 a 5 letras por revelar, se revelarán todas al hacer click en la diana
    if(cantidadCasillasVacias < 5 && numLetras !== 1){
        numLetras = cantidadCasillasVacias
    } else if(cantidadCasillasVacias === 0){
        numLetras = 0;
    }

    return numLetras;
}

/* Revela la casilla valida y devuelve true */
function revelarCasillaValida(game, casillas, casillaAleatoria){
    let [dataX, dataY] = atributosCasilla(casillas[casillaAleatoria]);

    // Selecciona la letra que está en esa casilla
    casillas[casillaAleatoria].innerText = game.letterAt(dataX, dataY);

    // Marca que se encontró una casilla válida
    return true;
}

/* Busca una casilla valida para poder revelar la letra que la contiene */
function recogerCasillaAleatoria(game, casillas){

    let casillaValidaEncontrada = false;
    let casillaAleatoria;

    while (!casillaValidaEncontrada) {
        // Selecciona una posición de una casilla al azar
        casillaAleatoria = Math.floor(Math.random() * casillas.length);
        
        if (comprobarCasillaVacia(casillas[casillaAleatoria])) {
            casillaValidaEncontrada = revelarCasillaValida(game, casillas, casillaAleatoria);
        }
    }
}

/* Comprobará si quedan casillas por revelar, si no quedan, finaliza */
function buscarLetrasParaRevelar(game, numLetras){    

    const casillas = document.querySelectorAll(".letter"); 
    numLetras = comprobarLetrasSinRevelar(casillas, numLetras);
    
    if (numLetras === 0) {
        return;
    } else {
        for (let i = numLetras; i >= 1; i--) {
            recogerCasillaAleatoria(game, casillas);
        }
    }

}

/* Manejador para revelar una letra al azar del tablero */
function ayudaBombilla(game){
    let numLetras = 1;
    const bombilla = document.querySelector(".fa-lightbulb").parentElement;
    bombilla.addEventListener("click", () => buscarLetrasParaRevelar(game, numLetras))
}

/* Manejador para revelar cinco letras al azar del tablero */
function ayudaDiana(game){
    let numLetras = 5;
    const diana = document.querySelector(".fa-expand").parentElement;
    diana.addEventListener("click", () => buscarLetrasParaRevelar(game, numLetras))
}

export { ayudaDiana, ayudaBombilla }