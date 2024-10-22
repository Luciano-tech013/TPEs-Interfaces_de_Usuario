class Tablero {
    constructor(ctx) {
        this.ctx = ctx;
        this.widthRect =  100;
        this.heightRect = 100;
        this.MAX_FILA = 0;
        this.MAX_COL = 7;
        this.casilleros = [[], [], [], [], [], [], []];
        this.cargarCasilleros();
        this.MAX_FILA = this.casilleros.length-1;   
    }

    /* 
        Para tener los casilleros cargados en la matriz listos para dibujarse
    */
    cargarCasilleros() {
        let casillero;
        let posRectY = this.heightRect, 
            posArcY = posRectY + (posRectY/2), 
            posRectX = this.widthRect, 
            posArcX = posRectX + (posRectX/2);

        for(let fila = 0; fila < this.casilleros.length-1; fila++) {
            posRectX = this.widthRect * 2.7;
            posArcX = posArcX * 2.13;
            for(let col = 0; col < this.MAX_COL; col++) {
                casillero = new Casillero(posRectX, posRectY, posArcX, posArcY, this.widthRect, this.heightRect, this.ctx);
                this.casilleros[col].push(casillero);
                posRectX += this.widthRect; posArcX += this.widthRect;
            }
            posRectX = this.widthRect; posArcX = posRectX + (posRectX/2);
            posRectY += this.heightRect; posArcY += this.heightRect;
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
        for(let col = 0; col < this.MAX_COL; col++) {
            for(let fila = 0; fila < this.MAX_FILA; fila++) {
                this.casilleros[col][fila].draw();   
            }
        }
    }
}