class Juego {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.tablero = new Tablero(this.ctx);
        this.fichas1 = [];
        this.fichas2 = [];
        this.cantFichas = ((this.tablero.getMaxFila()-1) * this.tablero.getMaxCol()) / 2;
        this.isMouseDown = true;
        this.lastClickedFigure = null;
        this.clickedFigure = null;
        this.posXClickedFigure = 0;
        this.posYClickedFigure = 0;
    }

    /*
        Para instanciar el tablero y las fichas para cada jugador
    */
    inicializarJuego() {
        this.tablero.drawTablero();
        this.generarFichas(this.fichas1, 80, `rgb(255, 255, 0)`);
        this.generarFichas(this.fichas2, this.canvas.width - 80, `rgb(0, 255, 0)`);
        this.mostrarFichas(this.fichas1);
        this.mostrarFichas(this.fichas2);
    }

    generarFichas(fichas, posXFicha, color) {
        let posY = 660; let posX = posXFicha;

        for(let i = 0; i < this.cantFichas; i++) {
            fichas.push(new Ficha(posX, posY, (this.canvas.width / 32), color, this.ctx));
            posY -= 18;
        }
        console.log(this.fichas1);
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
        if(this.clickedFigure != null && this.verificarClickedFigure()) {
            /*
                Si hay una figura clickeada , seteo el estado de la ficha y guardo la referencia a esa figura
                Me sirve para saber que ficha sse esta moviendo
            */
            this.clickedFigure.setSeleccionada(true);

            //Estas posiciones me sirven para dibujar la ficha en su posicion original si no fue soltada
            //en la posicion valida
            this.posXClickedFigure = this.clickedFigure.getPosX();
            this.posYClickedFigure = this.clickedFigure.getPosY();
            this.lastClickedFigure = this.clickedFigure;
            this.clickedFigure.draw();

            this.canvas.addEventListener('mousemove', e => { juego.onMouseMove(e); }, false);
        }
    }
    
    verificarClickedFigure() {
        let posUltimaFicha = this.fichas1.length-1;
        let posClickedFigure = this.fichas1.indexOf(this.clickedFigure);
        
        if(posClickedFigure != -1)
            return posClickedFigure == posUltimaFicha;

        return false;
    }

    onMouseMove(e) {
        console.log("MOVIENDOO")
        if(this.isMouseDown && this.lastClickedFigure != null) {
            //Si e.layerX es menor a la posX del rec y e.layerY es menor a la posY del rec:
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
        this.tablero.drawTablero();
        this.mostrarFichas(this.fichas1);
        this.mostrarFichas(this.fichas2);
    }

    onMouseUp(e) {
        console.log("SE SOLTO")
        this.isMouseDown = false; 
        
        // Logica para verificar que la ficha se suelte en la ubicacion correcta
        if(this.lastClickedFigure != null && !this.isMouseDown) {
            this.lastClickedFigure.setSeleccionada(false);
            // Si se solto en la posicion valida
            if(this.posicionValida()) {
                this.borrarYdibujar();
                this.lastClickedFigure.draw();
                //Desp controlamos el array segun el turno de que jugador sea
                /*
                    Para eliminar lastClickedFigure del arreglo el metodo shift() no sirve porque aun asi
                    el array sigue manteniendo la referencia a la ficha. En su lugar, usamos splice()
                */
                let index = this.fichas1.indexOf(this.lastClickedFigure);
                if (index !== -1) 
                    this.fichas1.splice(index, 1);

                this.setearNuevaPosicion(this.fichas1); //Para el turno del jugador dos, se llamaria de la misma forma pero pasandole el this.fichas2
                this.borrarYdibujar();
                this.lastClickedFigure.draw();
                
                let casilleroReceptor = this.tablero.findCasilleroReceptor(this.lastClickedFigure);
                let indexCasilleroReceptor = this.tablero.findIndexCasilleroReceptor(casilleroReceptor);
                if(indexCasilleroReceptor != -1) {
                    if(this.tablero.sePuedeDibujar(indexCasilleroReceptor)) {
                        let posArcCasilleroReceptor = this.tablero.obtenerPosDeArcCasillero(indexCasilleroReceptor);
                    }
                }
            
            } else {
                // Falta checkear que cuando la ficha cae en la zona de recepcion y la sacas por accidente de ese lugar
                // Te la dibujo ahi mismo en vez del maso. Chekearlo cuando ya tengamos lo de verificar columna (lo del if de arriba)
                this.lastClickedFigure.setPosicion(this.posXClickedFigure, this.posYClickedFigure);
                this.borrarYdibujar();
            }
        }
    }

    setearNuevaPosicion(fichasAModificar) {
        let ficha;
        for(let i = 0; i < fichasAModificar.length; i++) {
            ficha = fichasAModificar[i];
            ficha.setPosY(ficha.getPosY() - 20);
        }
    }

    posicionValida() {
        return this.posXValida() && this.posYValida();
    }

    posXValida() {
        let posX = this.lastClickedFigure.getPosX();
        return posX > this.tablero.getPosXIniAreaRecepcion() && posX < this.tablero.getPosXFinAreaRecepcion(); 
    }

    posYValida() {
        let posY = this.lastClickedFigure.getPosY();
        return posY > this.tablero.getPosYIniAreaRecepcion() && posY < (this.tablero.getPosYIniAreaRecepcion() + this.tablero.getHeightRect());
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
