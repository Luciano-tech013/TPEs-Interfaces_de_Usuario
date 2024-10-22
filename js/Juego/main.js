//DATOS
const canvasJuego = document.getElementById("canvasJuego");

const juego = new Juego(canvasJuego);

//EJECUTAR JUEGO
juego.inicializarJuego();

canvasJuego.addEventListener('mousedown', e => { juego.onMouseDown(e); }, false);

// canvasJuego.addEventListener('mousemove', e => { juego.onMouseMove(e); }, false);

canvasJuego.addEventListener('mouseup', e => { juego.onMouseUp(e); }, false);
