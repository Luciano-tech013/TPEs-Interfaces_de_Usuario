//DATOS
const canvasTablero = document.getElementById("canvasTablero");
const canvasFichas1 = document.getElementById("canvasFichas1");
const canvasFichas2 = document.getElementById("canvasFichas2");

const juego = new Juego(canvasTablero, canvasFichas1, canvasFichas2);


/*//EJECUTAR JUEGO
tablero.draw();*/
juego.inicializarJuego();