import center from '../enunciado/src/lib/center.js'

let posicionesOriginales = [];
let fila = 0;
let columna = 0;
let maxColumn = 0;
let maxRow = 0;

/* Para que no se salga del tablero en el caso de que la palabra acabe fuera de las casillas*/
function ajustarLimiteColumn(direccion, columnaActual, maxColumn, longitud) {
    if (direccion === 'horizontal' && (columnaActual + longitud) >= 10) {
        maxColumn +=1;
    } 
    return maxColumn;
}

function ajustarLimiteRow(direccion, filaActual, maxRow, longitud) {
    if (direccion === 'vertical' && (filaActual + longitud) >= 10) {
        maxRow += 1;
    }
    return maxRow;
}

/* Define la maxima fila y columna para el juego */
function maximaFilaColumna(origenColumna, origenFila, word){    
    if (maxRow < origenFila){
        maxRow = origenFila;
    } else if (maxColumn < origenColumna){
        maxColumn = origenColumna;
    }

    maxColumn = ajustarLimiteColumn(word.direction, origenColumna, maxColumn, word.length);
    maxRow = ajustarLimiteRow(word.direction, origenFila, maxRow, word.length);

    return [maxColumn, maxRow];
}

/* Calcula el desplazamiento de las casillas necesario para centrarlas en el grid */
function calcularDesplazamientoCentradoCasillas(wordPositions) {
    let word;
    for (let i = 0; i < wordPositions.length; i++){
        word = wordPositions[i];
        let origenColumna = word.origin[0]; /* coordenadas[0] = desplazamiento en eje X (columna) */
        let origenFila = word.origin[1]; /* coordenadas[1] = desplazamiento en eje Y (fila) */

        [maxColumn, maxRow] = maximaFilaColumna(origenColumna, origenFila, word);
    }
    return center(maxColumn, maxRow, 10, 10); 
}

/* Comprueba si el div de la casilla ya está pintado */
function estaPintada(fila, columna, contenedorRejilla){
    
    const posicion = `[style*="grid-area: ${fila} / ${columna}"]`;
    let casillaExiste = contenedorRejilla.querySelector(posicion);
    
    // Si no existe, devuelve NULL 
    return casillaExiste;
}

/* Devuelve la fila y la columna donde debe ir la casilla*/
function devolverFilaColumna(wordPosition, j, desplazamientoX, desplazamientoY){

    let inicioColumna = wordPosition.origin[0] + 1; /* Coordenadas X en la posición de origen para esa palabra más 1 porque el tablero va de 1 a 10 */
    let inicioFila = wordPosition.origin[1] + 1; /* Ccoordenadas Y en la posición de origen para esa palabra */

    if (wordPosition.direction === 'horizontal') {
        fila = inicioFila + desplazamientoY;
        columna = inicioColumna + j + desplazamientoX;
        posicionesOriginales = [wordPosition.origin[0] + j, wordPosition.origin[1]];
    } else {
        fila = inicioFila + j + desplazamientoY;
        columna = inicioColumna + desplazamientoX;
        posicionesOriginales = [wordPosition.origin[0], wordPosition.origin[1] + j];
    }
    return [fila, columna];
}

/* Pinta una casilla */
function pintarCasillaVacia(fila, columna, contenedorRejilla){
    let casillaVacia;
    casillaVacia = document.createElement("div");
    casillaVacia.classList.add("letter");
    casillaVacia.setAttribute('data-x',posicionesOriginales[0]); /* Posicion antes del desplazamiento para centrar */
    casillaVacia.setAttribute('data-y', posicionesOriginales[1]); /* Posicion antes del desplazamiento para centrar */
    casillaVacia.style.gridArea = `${fila} / ${columna}`;    
    contenedorRejilla.appendChild(casillaVacia);
}

/* Prepara la rejilla teniendo en cuenta la posición inicial y los valores que hay que desplazar */
function montarRejilla(wordPositions) {
    
    const [ desplazamientoX, desplazamientoY ] =  calcularDesplazamientoCentradoCasillas(wordPositions);
    const contenedorRejilla =  document.body.children[0].firstElementChild.children[1].firstElementChild;

    for (let i = 0; i < wordPositions.length; i++) {
        for (let j = 0; j < wordPositions[i].length; j++) {
            let [fila, columna] = devolverFilaColumna(wordPositions[i], j, desplazamientoX, desplazamientoY);
            
            if (!estaPintada(fila, columna, contenedorRejilla)){
                pintarCasillaVacia(fila, columna, contenedorRejilla);
            }   
        }
    }
}

/* Obtener los atributos del div de la casilla */
function atributosCasilla(casilla){
    let dataX = parseInt(casilla.getAttribute('data-x'));
    let dataY = parseInt(casilla.getAttribute('data-y'));

    return [dataX, dataY];
}

/* Comprueba si la casilla está vacía */
function comprobarCasillaVacia(casilla){

    if (casilla.innerText === ''){
        return true;
    } else {
        return false;
    }
}

export {
    montarRejilla, atributosCasilla, comprobarCasillaVacia
}
