
/* Recoge las poisicion de la casilla donde va la letra de la palabra seleccionada */
function buscarPosicionCasilla(wordPosition, i){
    const contenedorRejilla =  document.body.children[0].firstElementChild.children[1].firstElementChild;
    
    let origenColumna = wordPosition.origin[0]; // Origen X
    let origenFila = wordPosition.origin[1]; // Origen Y

    if (wordPosition.direction === 'horizontal'){
        origenColumna += i;  // Desplazarse en eje X
    } else {
        origenFila += i; // Desplazarse en eje Y
    }

    let buscarPosicion = `[data-x="${origenColumna}"][data-y="${origenFila}"]`;
    let posicionCasilla = contenedorRejilla.querySelector(buscarPosicion);

    return posicionCasilla;
}

/* Escribe la palabra en las casillas, recorriendolas */
function escribirPalabraEnCasillas(wordPosition, palabra){

    for (let i = 0; i < palabra.length; i++){
        let casillaParaRellenar = buscarPosicionCasilla(wordPosition, i);
        casillaParaRellenar.textContent = palabra.charAt(i);
    }
}

/* Encuentra la posición de la palabra que está seleccionada*/
function palabraCompletada(game, palabra){
   
   try {
        let wordPosition = game.findWord(palabra);
        console.log(palabra);

        escribirPalabraEnCasillas(wordPosition, palabra);
        
    } catch (WordNotFound){ 
        console.log(`${WordNotFound}`);
    }
}

export { palabraCompletada }