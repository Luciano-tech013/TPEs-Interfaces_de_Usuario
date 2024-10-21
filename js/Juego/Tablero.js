class Tablero {
    constructor(canvas) {
        this.canvas = canvas;
        this.widthRect =  100;
        this.heightRect = 100;
        this.MAX_FILA = 0;
        this.MAX_COL = 7;
        this.casilleros = [[], [], [], [], [], [], []];
        this.ctx = canvas.getContext("2d");
        this.cargarCasilleros();
        this.MAX_FILA = this.casilleros.length-1;   
    }

    /* 
        Para tener los casilleros cargados en la matriz listos para dibujarse
    */
    cargarCasilleros() {
        let casillero;
        for(let fila = 0; fila < this.casilleros.length-1; fila++) {
            for(let col = 0; col < this.MAX_COL; col++) {
                casillero = new Casillero(this.widthRect, this.heightRect, this.ctx);
                this.casilleros[col].push(casillero);
            }
        }
    }

    getMaxFila() {
        return this.MAX_FILA;
    }

    getMaxCol() {
        return this.MAX_COL;
    }

    setMaxFila(MAX_FILA) {
        this.MAX_FILA = MAX_FILA;
    }

    setMaxCol(MAX_COL) {
        this.MAX_COL = MAX_COL;
    }

    setWidthRect(widthRect) {
        this.widthRect = widthRect;
    }

    setHeightRect(heightRect) {
        this.heightRect = heightRect;
    }

    /*
        Al eje en Y nunca lo reseteo porque dibujo de arriba para abajo
        Este metodo delega la responsabilidad a los casilleros de dibujarse
    */
    draw() {
        let casillero; 
        let casilleroActual = this.casilleros[0][0];
        for(let fila = 0; fila < this.MAX_FILA; fila++) {
            for(let col = 0; col < this.MAX_COL; col++) {
                if(fila > 0) {
                    //Avanzo sobre el eje Y
                    casilleroActual.setPosRectY(casilleroActual.getPosRectY() + this.heightRect * fila);
                    casilleroActual.setPosArcY(casilleroActual.getPosArcY() + this.heightRect * fila);
                }
                casillero = this.casilleros[col][fila];
                casilleroActual.draw();
                //Avanzo sobre el eje X
                casillero.setPosRectX(casilleroActual.getPosRectX() + this.widthRect);
                casillero.setPosArcX(casilleroActual.getPosArcX() + this.widthRect);

                //Guardo el casillero que obtuve accediendo a la matriz
                casilleroActual = casillero;
            }
            //Reseteo el eje X
            casilleroActual.setPosRectX(this.widthRect);
            casilleroActual.setPosArcX(casilleroActual.calcPosArcXInicial());
        }
    }
}