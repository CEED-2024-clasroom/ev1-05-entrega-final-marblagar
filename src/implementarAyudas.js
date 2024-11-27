import { ayudaDiana, ayudaBombilla } from './ayudaRevelar.js'
import { ayudaMartillo } from './ayudaMartillo.js'
import { ayudaMezcla } from './ayudaMezclar.js'

/* Programar la llamada a los botones de ayuda */

/* Crear los items de ayuda  */
function crearAyudas(game){

    ayudaMezcla();
    ayudaBombilla(game);
    ayudaDiana(game);
    ayudaMartillo(game);

}

export { crearAyudas }