//DATOS
const canvasJuego = document.getElementById("canvasJuego");
const btnsDeModoDeJuego = document.querySelectorAll(".btn_modo_de_juego");
const juego = new Juego(canvasJuego);

btnsDeModoDeJuego.forEach(btnModoDeJuego => {
    btnModoDeJuego.addEventListener("click", (e) => {
        juego.inicializar(e.target.value, "Luciano", "Adrian");
        canvasJuego.addEventListener('mousedown', e => { juego.onMouseDown(e); }, false);
        canvasJuego.addEventListener('mouseup', e => { juego.onMouseUp(e); }, false);
    });
});




