class Tablero {
    constructor(ctx, url, modoDeJuegoSeleccionado, modosDeJuegoPermitidos) {
        this.ctx = ctx;
        this.widthRect =  80;
        this.heightRect = 80;
        this.MAX_FILA = 0;
        this.MAX_COL = 7;
        this.casilleros = [[], [], [], [], [], [], []];
        this.MAX_FILA = this.casilleros.length;
        this.CANT_FICHAS_PARA_GANAR = 4;
        this.contFichasParaGanar = 0;
        this.juegoIniciado = false;
        this.modoDeJuegoSeleccionado = modoDeJuegoSeleccionado;
        this.modosDeJuegoPermitidos = modosDeJuegoPermitidos;
        this.skin = new Image();
        this.setSkin(url);
        this.cargarCasillerosReceptores();
        this.cargarCasilleros();
        console.log(this.casilleros); 
        //Atributos para poder hacer la validacion de posicion correcta cuando se suelte la ficha
        this.posXIniAreaRecepcion = this.casilleros[0][0].getPosXRect();
        this.posXFinAreaRecepcion = this.casilleros[0][this.MAX_COL-1].getPosXRect() + this.widthRect;
        this.posYIniAreaRecepcion = this.casilleros[0][0].getPosYRect();
        //console.log(this.casilleros); 
    }

    setSkin(url) {
        this.skin.src = url;
        this.skin.onload = () => {
            this.ctx.drawImage(this.skin, 0, 0, 1540, 800);
        }
    }

    /* 
        Para tener los casilleros receptores cargados en la matriz listos para dibujarse
    */
    cargarCasillerosReceptores() {
        let configuraciones = this.obtenerConfiguraciones();
        let divisorX = configuraciones[1].divisorX;
        let posRectY = this.heightRect - 30, posRectX = 0;
        this.widthRect -= configuraciones[1].width;
        this.heightRect -= configuraciones[1].width;
        
        for(let fila = 0; fila < 1; fila++) {
            posRectX = 1520/divisorX;;
            for(let col = 0; col < this.MAX_COL + configuraciones[1].dimension; col++) {
                this.casilleros[fila].push(new Casillero(posRectX, posRectY, 0, 0, this.widthRect, this.heightRect, `rgb(50, 255, 0)`, true, this.ctx));
                posRectX += this.widthRect;
            }
        }
    }

    cargarCasilleros() {
        // `rgba(11, 44, 89, 0.6)`
        // `rgba(231, 73, 110, 0.6)`
        // `rgba(36, 40, 44, 1)`
        let configuraciones = this.obtenerConfiguraciones();
        this.widthRect -= configuraciones[1].width;
        this.heightRect -= configuraciones[1].width;

        let posRectY = (this.heightRect * 2)- 30, posRectX = 0, posArcY = posRectY * 1.30, posArcX = 0, color = `rgba(36, 40, 44, 0.8)`;
        
        if(this.modoDeJuegoSeleccionado != 4)
            this.reedimensionar(configuraciones);

        this.setCasilleros(configuraciones[1].divisorX, posRectX, posRectY, posArcX, posArcY, color);   
    }

    obtenerConfiguraciones() {
        let modoSeleccionado;
        for (let [modo, configuracion] of this.modosDeJuegoPermitidos) {
            if(modo === this.modoDeJuegoSeleccionado) {
                modoSeleccionado = [modo, configuracion];
            }
        }

        return modoSeleccionado;
    }

    reedimensionar(configuraciones) {
        this.MAX_COL += configuraciones[1].dimension;
        this.MAX_FILA += configuraciones[1].dimension;
        
        for(let i = 0; i < configuraciones[1].dimension; i++) {
            this.casilleros.push([]);
        }
    }

    setCasilleros(divisorX, posRectX, posRectY, posArcX, posArcY, color) {
        for(let fila = 1; fila < this.casilleros.length; fila++) {
            posRectX = 1520/divisorX;
            posArcX = posRectX + 40;
            for(let col = 0; col < this.MAX_COL; col++) {
                this.casilleros[fila].push(new Casillero(posRectX, posRectY, posArcX, posArcY, this.widthRect, this.heightRect, color, false, this.ctx));
                posRectX += this.widthRect; posArcX += this.widthRect; 
            }

            posRectX = this.widthRect; posArcX = posRectX + (posRectX/2);
            posRectY += this.heightRect; posArcY += this.heightRect;
        }
    }

    setJuegoIniciado(iniciado) {
        this.juegoIniciado = iniciado;
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

    juegoEstaIniciado() {
        return this.juegoIniciado;
    }

    /*
        Al eje en Y nunca lo reseteo porque dibujo de arriba para abajo
        Este metodo delega la responsabilidad a los casilleros de dibujarse
    */
    dibujar() {
        this.ctx.drawImage(this.skin, 0, 0, 1540, 800);

        for(let fila = 0; fila < this.MAX_FILA; fila++) {
            for(let col = 0; col < this.MAX_COL; col++) {
                if(this.juegoEstaIniciado())
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
        let casilleroEncontrado = null;
        this.casilleros[0].forEach(casillero => {
            if (casillero.isPointInside(ficha.getPosX(), ficha.getPosY())) 
                casilleroEncontrado = casillero;
        });
    
        return casilleroEncontrado;
    }

    buscarIndiceDeCasillero(receptor) {
        return this.casilleros[0].indexOf(receptor);
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

        return casillero;
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
            console.log(this.contFichasParaGanar);
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