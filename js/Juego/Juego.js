class Juego {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.tablero = new Tablero(this.ctx);
        this.fichas1 = [];
        this.fichas2 = [];
        this.cantFichas = (this.tablero.getMaxFila() * this.tablero.getMaxCol()) / 2;
        this.isMouseDown = true;
        this.lastClickedFigure = null;
        this.clickedFigure = null;
    }

    /*
        Para instanciar el tablero y las fichas para cada jugador
    */
    inicializarJuego() {
        this.tablero.draw();
        this.generarFichas(this.fichas1, 80, `rgb(255, 255, 0)`);
        this.generarFichas(this.fichas2, this.canvas.width - 80, `rgb(0, 255, 0)`);
        this.mostrarFichas(this.fichas1);
        this.mostrarFichas(this.fichas2);
    }

    generarFichas(fichas, posXFicha, color) {
        let posY = 660; let posX = posXFicha;

        for(let i = 0; i < this.cantFichas-1; i++) {
            fichas.push(new Ficha(posX, posY, (this.canvas.width / 32), color, this.ctx));
            posY -= 25;
        }
    }

    mostrarFichas(fichas) {
        for(let i = 0; i < fichas.length; i++) {
            fichas[i].draw();
        }
    }
    
    onMouseDown(e) {
        console.log("MANTENIENDO");
        this.isMouseDown = true;
        
        if(this.lastClickedFigure != null) {
            this.lastClickedFigure.setSeleccionada(false);
            this.lastClickedFigure = null;
        }

        this.clickedFigure = this.findClickedFigure(e.layerX, e.layerY);
        console.log(this.clickedFigure);
        console.log(this.fichas1[0]);
        if(this.clickedFigure != null && this.comprobarClickedFigure()) {
            /*
                Si hay una figura clickeada , seteo el estado de la ficha y guardo la referencia a esa figura
                Me sirve para saber que ficha sse esta moviendo
            */
            this.clickedFigure.setSeleccionada(true);
            this.lastClickedFigure = this.clickedFigure;
            this.clickedFigure.draw();
        }

        this.canvas.addEventListener('mousemove', e => { juego.onMouseMove(e); }, false);
    }
    
    comprobarClickedFigure() {
        let pos = this.fichas1.length-1;
        return this.clickedFigure.equals(this.fichas1[pos], this.fichas2[pos]);
    }

    onMouseMove(e) {
        console.log("MOVIENDOO")
        if(this.isMouseDown && this.lastClickedFigure != null) {
            this.lastClickedFigure.setPosicion(e.layerX, e.layerY);
            this.borrarYdibujar();
        }
    }

    clearCanvas() {
        this.ctx.fillStyle = 'rgb(179, 179, 179)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    borrarYdibujar() {
        this.clearCanvas();
        this.tablero.draw();
        this.mostrarFichas(this.fichas1);
        this.mostrarFichas(this.fichas2);
    }

    onMouseUp(e) {
        console.log("SE SOLTO")
        this.isMouseDown = false;
        this.borrarYdibujar();
        // Logica para verificar que la ficha se suelte en la ubicacion correcta
            //Si esta en la posicion correcta, ademas de preguntarle al tablero, :
                //this.fichas1.shift();
                //Reedibujo las fichas
    }

    findClickedFigure(x, y) {
        const fichasTotal = [...this.fichas1, ...this.fichas2];
    
        let ficha;
        for(let i = 0; i < fichasTotal.length; i++) {
            ficha = fichasTotal[i];
            if(ficha.estaSeleccionada(x, y)) {
                return ficha;
            }
        }
    }
}
