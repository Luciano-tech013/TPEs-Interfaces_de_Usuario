class Tablero {
    constructor(ctx) {
        this.ctx = ctx;
        this.widthRect =  100;
        this.heightRect = 100;
        this.MAX_FILA = 0;
        this.MAX_COL = 7;
        this.casilleros = [[], [], [], [], [], [], []];
        this.cargarCasillerosReceptores();
        this.cargarCasilleros();
        this.MAX_FILA = this.casilleros.length;
        //Atributos para poder hacer la validacion de posicion correcta cuando se suelte la ficha
        this.posXIniAreaRecepcion = this.casilleros[0][0].getPosXRect();
        this.posXFinAreaRecepcion = this.casilleros[0][this.MAX_COL-1].getPosXRect() + this.widthRect;
        this.posYIniAreaRecepcion = this.casilleros[0][0].getPosYRect(); 
        console.log(this.casilleros[0]); 
    }

    getPosXIniAreaRecepcion() {
        return this.posXIniAreaRecepcion;
    }

    getPosXFinAreaRecepcion() {
        return this.posXFinAreaRecepcion;
    }

    getPosYIniAreaRecepcion() {
        return this.posYIniAreaRecepcion;
    }

    getHeightRect() {
        return this.heightRect;
    }

    /* 
        Para tener los casilleros receptores cargados en la matriz listos para dibujarse
    */
    cargarCasillerosReceptores() {
        let casillero;
        let posRectY = this.heightRect, posRectX = 0;

        for(let fila = 0; fila < 1; fila++) {
            posRectX = this.widthRect * 2.7;
            for(let col = 0; col < this.MAX_COL; col++) {
                casillero = new Casillero(posRectX, posRectY, 0, 0, this.widthRect, this.heightRect, `rgb(0, 179, 179)`, true, this.ctx);
                this.casilleros[fila].push(casillero);
                posRectX += this.widthRect;
            }
        }
    }

    cargarCasilleros() {
        let casillero,
            posRectY = this.heightRect * 2, 
            posArcY = posRectY + (posRectY/4), 
            posRectX = this.widthRect, 
            posArcX = posRectX + (posRectX/2);
        
        for(let fila = 1; fila < this.casilleros.length; fila++) {
            posRectX = this.widthRect * 2.7;
            posArcX = posArcX * 2.13;
            for(let col = 0; col < this.MAX_COL; col++) {
                casillero = new Casillero(posRectX, posRectY, posArcX, posArcY, this.widthRect, this.heightRect, `rgb(50, 255, 0)`, false, this.ctx);
                this.casilleros[fila].push(casillero);
                posRectX += this.widthRect; posArcX += this.widthRect; 
            }

            posRectX = this.widthRect; posArcX = posRectX + (posRectX/2);
            posRectY += this.heightRect; posArcY += this.heightRect;
        }
    }

    getPosXRect() {
        return this.widthRect * 2.7;
    }

    getPosYRect() {
        return this.heightRect;
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
    drawTablero() {
        for(let fila = 0; fila < this.MAX_FILA; fila++) {
            for(let col = 0; col < this.MAX_COL; col++) {
                this.casilleros[fila][col].drawCasillero();   
            }
        }
    }

    findCasilleroReceptor(ficha) {
        let casillero;
        for(let fila = 0; fila < 1; fila++) {
            for(let col = 0; col < this.MAX_COL; col++) {
                casillero = this.casilleros[fila][col];
                if(casillero.isPointInside(ficha.getPosX(), ficha.getPosY())) {
                    return casillero;
                }
            }
        }
    }

    findIndexCasilleroReceptor(casillero) {
        return this.casilleros[0].indexOf(casillero);
    }

    sePuedeDibujar(col) {
        let casillero;
        //Mayor a 0 para que no llegue hasta los casilleros receptores
        for(let fila = this.MAX_FILA; fila > 0; fila--) {
            casillero = this.casilleros[fila][col];
            if(casillero.tieneFicha())
                return true;
        }

        return false;
    }

    obtenerPosDeArcCasillero(col) {
        for(let fila = this.MAX_FILA; fila > 0; fila--) {
            
                
        }
    }
}