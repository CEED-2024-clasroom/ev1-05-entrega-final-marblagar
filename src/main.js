import '../enunciado/src/styles/styles.css'
import '../enunciado/src/lib/fontawesome.js'
import { Game } from '../enunciado/src/lib/Game.js' //Para poder hacer import de una clase, debemos utilizar las llaves para hacer el import
import { mostrarRueda }  from './gestionarRueda.js'
import { montarRejilla } from './gestionarCasillas.js'
import { crearAyudas } from './implementarAyudas.js';

function crearJuego(){ 

    const game = new Game(); // Creación objeto Game que incluye la id GAMES que se ha importado de la clase games.js 
    const wordPositions = game.wordPositions;
    let letrasDisponibles = game.letters; // Letras disponibles es un string
    letrasDisponibles = letrasDisponibles.toUpperCase();

    montarRejilla(wordPositions);
    mostrarRueda(game, letrasDisponibles);
    crearAyudas(game);    
}

crearJuego();

