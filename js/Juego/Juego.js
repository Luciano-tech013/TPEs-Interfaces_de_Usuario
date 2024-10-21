class Juego {
    constructor(canvasTablero, canvasFichas1, canvasFichas2) {
        this.tablero = new Tablero(canvasTablero);
        this.fichas1 = [];
        this.fichas2 = [];
        this.canvasFichas1 = canvasFichas1;
        this.canvasFichas2 = canvasFichas2;
        this.cantFichas = this.tablero.getMaxFila() * this.tablero.getMaxCol();
    }

    inicializarJuego() {
        this.tablero.draw();
        this.cargarFichas(this.fichas1, this.canvasFichas1);
        //this.cargarFichas(this.fichas2, this.canvasFichas1);
        this.mostrarFichas(this.fichas1);
    }

    cargarFichas(fichas, canvas) {
        const ctx = canvas.getContext("2d");

        for(let i = 0; i < this.cantFichas / 2; i++) {
            fichas.push(new Ficha(canvas.width, canvas.height, (canvas.width / 2.5), ctx));
        }
    }

    mostrarFichas(fichas) {
        for(let ficha of fichas) {
            ficha.draw();
        }
    }
}