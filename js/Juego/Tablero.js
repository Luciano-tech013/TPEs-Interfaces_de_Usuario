class Tablero {
    constructor(ctx, configuraciones) {
        this.ctx = ctx;
        this.widthRect =  72;
        this.heightRect = 72;
        this.MAX_FILA = 0;
        this.MAX_COL = 7;
        this.casilleros = [[], [], [], [], [], [], []];
        this.MAX_FILA = this.casilleros.length;
        this.configuraciones = configuraciones;
        this.CANT_FICHAS_PARA_GANAR = this.configuraciones[0];
        this.contFichasParaGanar = 0;
        this.cargarCasillerosReceptores();
        this.cargarCasilleros();
        //Atributos para poder hacer la validacion de posicion correcta cuando se suelte la ficha
        this.posXIniAreaRecepcion = this.casilleros[0][0].getPosXRect();
        this.posXFinAreaRecepcion = this.casilleros[0][this.MAX_COL-1].getPosXRect() + this.widthRect;
        this.posYIniAreaRecepcion = this.casilleros[0][0].getPosYRect(); 
    }

    /* 
        Para tener los casilleros receptores cargados en la matriz listos para dibujarse
    */
    cargarCasillerosReceptores() {
        let divisorX = this.configuraciones[1].divisorX;
        let posRectY = this.heightRect - 25, posRectX = 0;
        this.widthRect -= this.configuraciones[1].widthRect;
        this.heightRect -= this.configuraciones[1].widthRect;
        
        for(let fila = 0; fila < 1; fila++) {
            posRectX = 1520/divisorX;
            for(let col = 0; col < this.MAX_COL + this.configuraciones[1].dimension; col++) {
                this.casilleros[fila].push(new Casillero(posRectX, posRectY, 0, 0,  this.widthRect, this.heightRect, true, this.ctx));
                posRectX += this.widthRect;
            }
        }

        this.widthRect = 72;
        this.heightRect = 72;
    }

    cargarCasilleros() {
        this.widthRect -= this.configuraciones[1].widthRect;
        this.heightRect -= this.configuraciones[1].widthRect;
        
        let posRectY = (this.heightRect * 2) - this.configuraciones[1].posYRect, posRectX = 0, posArcY = posRectY * this.configuraciones[1].posYArc, posArcX = 0;
        
        if(this.configuraciones[0] != 4)
            this.reedimensionar();

        this.setCasilleros(this.configuraciones[1].divisorX, posRectX, posRectY, posArcX, posArcY);   
    }

    reedimensionar() {
        this.MAX_COL += this.configuraciones[1].dimension;
        this.MAX_FILA += this.configuraciones[1].dimension;
        
        for(let i = 0; i < this.configuraciones[1].dimension; i++) {
            this.casilleros.push([]);
        }
    }

    setCasilleros(divisorX, posRectX, posRectY, posArcX, posArcY) {
        for(let fila = 1; fila < this.casilleros.length; fila++) {
            posRectX = 1520/divisorX;
            posArcX = posRectX + this.configuraciones[1].posXArc;
            for(let col = 0; col < this.MAX_COL; col++) {
                this.casilleros[fila].push(new Casillero(posRectX, posRectY, posArcX, posArcY, this.widthRect, this.heightRect, false, this.ctx));
                posRectX += this.widthRect; posArcX += this.widthRect; 
            }

            posRectX = this.widthRect; posArcX = posRectX + (posRectX/2);
            posRectY += this.heightRect; posArcY += this.heightRect;
        }
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
    dibujar(juegoIniciado) {
        for(let fila = 0; fila < this.MAX_FILA; fila++) {
            for(let col = 0; col < this.MAX_COL; col++) {
                if(juegoIniciado)
                    this.dibujarTableroInicial(fila, col);
                else
                    this.casilleros[fila][col].dibujar();
            }
        }
    }

    dibujarTableroInicial(fila, col) {
        setTimeout(() => { this.casilleros[fila][col].dibujar(); }, 40 * (fila * this.MAX_COL + col));
    }

    buscarCasilleroReceptorDe(ficha) {
        let casillero = null, col = 0, stop = false;
        while(col < this.MAX_COL && !stop) {
            casillero = this.casilleros[0][col];
            if(casillero.isPointInside(ficha.getPosX(), ficha.getPosY()))
                stop = true;

            col++;
        }
        
        return casillero;
    }

    buscarIndiceDeCasillero(receptor) {
        const fila = this.casilleros[0];
        console.log(fila);
        return fila.indexOf(receptor);
    }

    buscarIndiceDe(casillero) {
        let fila = 0, indice = -1;
        while(fila < this.MAX_FILA && indice == -1) {
            fila++; indice = this.casilleros[fila].indexOf(casillero);
        }

        return {fila: fila, col: indice};
    }

    sePuedeDibujar(col) {
        let fila = this.MAX_FILA-1, casillero = null, sePuede = false;

        while(fila > 0 && !sePuede) {
            casillero = this.casilleros[fila][col];
            if(!casillero.tieneFicha())
                sePuede = true;
            
            fila--;
        }

        if(sePuede)
            return casillero;

        return null;
    }

    hayGanador(casillero) {
        const indice = this.buscarIndiceDe(casillero);
        if(indice.col == -1)
            return false;

        const casilleroFila = indice.fila;
        const casilleroCol = indice.col;
        
        return (
            this.recorrerFila(casilleroFila, casillero.getFicha()) || 
            this.recorrerColumna(casilleroCol, casillero.getFicha()) || 
            this.recorrerDiagonalIzquierda(casilleroFila, casilleroCol, casillero.getFicha()) || 
            this.recorrerDiagonalDerecha(casilleroFila, casilleroCol, casillero.getFicha())
        )
    }

    recorrerFila(fila, ficha) {
        this.contFichasParaGanar = 0;

        let col = 0;
        while(col < this.MAX_COL && this.contFichasParaGanar < this.CANT_FICHAS_PARA_GANAR) {
            this.contarFichas(this.casilleros[fila][col], ficha);
            col++
        }

        return this.contFichasParaGanar == this.CANT_FICHAS_PARA_GANAR;
    }

    recorrerColumna(col, ficha) {
        this.contFichasParaGanar = 0;

        let fila = this.MAX_FILA-1;
        while(fila > 0 && this.contFichasParaGanar < this.CANT_FICHAS_PARA_GANAR) {
            this.contarFichas(this.casilleros[fila][col], ficha);
            fila--;
        }

        return this.contFichasParaGanar == this.CANT_FICHAS_PARA_GANAR;
    }

    recorrerDiagonalIzquierda(fila, col, ficha) {
        this.contFichasParaGanar = 0;

        let filaOriginal = fila; let colOriginal = col;
        while(fila < this.MAX_FILA && col >= 0 && this.contFichasParaGanar < this.CANT_FICHAS_PARA_GANAR) {
            this.contarFichas(this.casilleros[fila][col], ficha);
            fila++; col--;
        }

        if(this.contFichasParaGanar < this.CANT_FICHAS_PARA_GANAR) {
            this.contFichasParaGanar = 0;

            while(filaOriginal >= 0 && colOriginal < this.MAX_COL && this.contFichasParaGanar < this.CANT_FICHAS_PARA_GANAR) {
                this.contarFichas(this.casilleros[filaOriginal][colOriginal], ficha);
                filaOriginal--; colOriginal++
            }
        }

        return this.contFichasParaGanar == this.CANT_FICHAS_PARA_GANAR;

    }

    recorrerDiagonalDerecha(fila, col, ficha) {
        this.contFichasParaGanar = 0;

        let filaOriginal = fila, colOriginal = col;
        while(fila < this.MAX_FILA && col < this.MAX_COL && this.contFichasParaGanar < this.CANT_FICHAS_PARA_GANAR) {
            this.contarFichas(this.casilleros[fila][col], ficha);
            fila++; col++;
        }

        if(this.contFichasParaGanar < this.CANT_FICHAS_PARA_GANAR) {
            this.contFichasParaGanar = 0;
            while(filaOriginal >= 0 && colOriginal >= 0 && this.contFichasParaGanar < this.CANT_FICHAS_PARA_GANAR) {
                this.contarFichas(this.casilleros[filaOriginal][colOriginal], ficha);
                filaOriginal--; colOriginal--;
            }
        }

        return this.contFichasParaGanar == this.CANT_FICHAS_PARA_GANAR;
    }

    contarFichas(casillero, ficha) {
        if(casillero.tieneFicha() && casillero.contiene(ficha))
            this.contFichasParaGanar++;
        else
            this.contFichasParaGanar = 0;
    }


}