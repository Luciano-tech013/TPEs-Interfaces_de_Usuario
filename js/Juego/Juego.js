class Juego {
    constructor(canvas, url) { 
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        /*
            Contiene los modos de juego permitidos y cual fue seleccionado por el usuario
        */
        this.modoDeJuego = null;
        this.modosDeJuego = new Map([
            [4, {dimension: 0, widthRect: 0, posYRect: 25, radiusFicha: 3.2, posXFicha: 185, posYFicha: 480, posYFichaMenos: 15, posXArc: 36, posYArc: 1.31, heightZona: 382}], 
            [5, {dimension: 1, widthRect: 8, posYRect: 17, radiusFicha: 3.5, posXFicha: 185, posYFicha: 488, posYFichaMenos: 12, posXArc: 32, posYArc: 1.30, heightZona: 392}], 
            [6, {dimension: 2, widthRect: 16, posYRect: 11, radiusFicha: 4, posXFicha: 185, posYFicha: 480, posYFichaMenos: 9, posXArc: 28, posYArc: 1.30, heightZona: 415}], 
            [7, {dimension: 3, widthRect: 21, posYRect: 5, radiusFicha: 4, posXFicha: 185, posYFicha: 480, posYFichaMenos: 7, posXArc: 26, posYArc: 1.29, heightZona: 420}]
        ]);
        /*
            Para saber que ficha se clickeo
        */
        this.isMouseDown = true;
        this.lastClickedFigure = null;
        this.clickedFigure = null;
        this.posXClickedFigure = 0;
        this.posYClickedFigure = 0;
        /*
            Para manejar los turnos del jugador
        */
        this.turnoJugador = null;
        this.jugadorGanador = null;
        /*
            Para saber si el juego esta terminado o empezado
        */
        this.juegoIniciado = false;
        this.juegoFinalizado = false;
        /*
            Contiene a los jugadores que participan, sus skin seleccionadas y la del juego
        */
        this.jugador1 = null;
        this.jugador2 = null;
        this.skinJugador1 = null;
        this.skinJugador2 = null;
        this.skin = new Image();
        this.skinCargada = false;
        /*
            Para manejar los temporizadores
        */
        this.temporizadorElemento = document.querySelector("#temporizador");
        this.posXTemporizador = 504;
        this.posYTemporizador = 34;
        this.temporizador = 0;
        this.temporizadorFinalizado = false;
        this.contador = 120;
        
        this.posYMenosFicha = 0;

        /*
            Referencia al casillero receptor para realizar el hint
        */
        this.casilleroReceptor = null;

        /*
            Para realizar la animacion
        */
        this.casilleroEncontrado = null;
        this.velocidadY = 1;
        this.gravedad = 0.5;

        this.setSkin(url);

        this.ganadorElemento = document.getElementById("ganador");
        this.menuDeSeleccion = document.querySelector(".ventanaMenuSeleccionActivada");
        this.juegoDiv = document.querySelector(".juegoActivado");
        this.menuDeFinalizacion = document.querySelector(".juego_finalizado_container");
        this.juegoEnFinalizacion = document.querySelector(".juegoActivado");

        this.zona1 = null;
        this.zona2 = null
    }

    setSkin(url) {
        this.skin.src = url;
    }
    
    /*
        Para instanciar el tablero y las fichas para cada jugador (Metodo Principal)
    */
    inicializar(modoDeJuego, nombreJugador1, nombreJugador2, skinJugador1, skinJugador2) {
        this.temporizadorFinalizado = false;
        this.juegoIniciado = true;
        this.skinJugador1 = skinJugador1;
        this.skinJugador2 = skinJugador2;
        this.inicializarElementos(modoDeJuego, nombreJugador1, nombreJugador2);
        this.turnoJugador = this.jugador1;
        this.turnoJugador.setTurn(true);
        this.turnoJugador.setFichaTurn(true);
        this.ejecutarTemporizador();
        this.clear();
        this.dibujar();
        this.juegoIniciado = false;
    }

    inicializarElementos(modoDeJuego, nombreJugador1, nombreJugador2) {
        this.modoDeJuego = (parseInt(modoDeJuego));
        this.configuraciones = this.obtenerConfiguraciones();
        this.inicializarTablero();
        this.inicializarJugadores(nombreJugador1, nombreJugador2);
        this.inicializarZonasFichas();
        this.inicializarFichas(this.configuraciones[1].posXFicha, this.configuraciones[1].posYFicha, this.configuraciones[1].posYFichaMenos, this.configuraciones[1].radiusFicha, this.skinJugador1, "yellow", this.jugador1);
        this.inicializarFichas((this.canvas.width - this.configuraciones[1].posXFicha + 12), this.configuraciones[1].posYFicha, this.configuraciones[1].posYFichaMenos, this.configuraciones[1].radiusFicha, this.skinJugador2, "red", this.jugador2);
    }

    inicializarZonasFichas() {
        this.zona1 = new ZonaFicha(this.ctx, 130, 130, 110, this.configuraciones[1].heightZona, `rgba(36, 40, 44, 0.8)`);
        this.zona2 = new ZonaFicha(this.ctx, 820, 130, 110, this.configuraciones[1].heightZona, `rgba(36, 40, 44, 0.8)`);
    }

    inicializarFichas(posX, posY, posYMenos, radius, skin, resaltado, jugador) {
        this.posYMenosFicha = posYMenos;

        for(let i = 0; i < this.cantFichas; i++) {
            jugador.addFicha(new Ficha(posX, posY, (90/radius), skin, resaltado, jugador, this.ctx));
                posY -= this.posYMenosFicha;
        }
    }

    inicializarTablero() {
        this.tablero = new Tablero(this.ctx, this.configuraciones);
        this.cantFichas = ((this.tablero.getMaxFila()-1) * this.tablero.getMaxCol()) / 2;
    }

    inicializarJugadores(nombreJugador1, nombreJugador2) {
        this.jugador1 = new Jugador(1, nombreJugador1, this.skinJugador1, "yellow", 0, 0, 5, 115, this.cantFichas, this.ctx);
        this.jugador2 = new Jugador(2, nombreJugador2, this.skinJugador2, "red", (this.canvas.width-95), 0, 10, 115, this.cantFichas, this.ctx);
    }

    finalizar(msg) {
        this.juegoFinalizado = true;
        this.finalizarTemporizador();
        
        this.ganadorElemento.innerHTML = msg;
        this.menuDeFinalizacion.classList.add("juego_finalizado_container_activado");
        this.juegoEnFinalizacion.classList.add("juego_en_finalizacion");
        const opciones = document.querySelectorAll(".home__carrousell__card__footer__button__play");

        let opcionClickeada;
        opciones.forEach(opcion => {
            opcion.addEventListener("click", () => {
                opcionClickeada = opcion.children[0];
                if(opcionClickeada.innerHTML === "REINICIAR") {
                    this.contador = 120;
                    this.inicializar(this.modoDeJuego, this.jugador1.getNombre(), this.jugador2.getNombre(), this.skinJugador1, this.skinJugador2);
                    this.menuDeFinalizacion.classList.remove("juego_finalizado_container_activado");
                    this.juegoEnFinalizacion.classList.remove("juego_en_finalizacion");
                    this.juegoFinalizado = false;
                } else {
                    this.clear();
                    this.juegoDiv.classList.remove("juegoActivado");
                    this.juegoEnFinalizacion.classList.remove("juego_en_finalizacion");
                    this.menuDeFinalizacion.classList.remove("juego_finalizado_container_activado");
                    this.menuDeSeleccion.classList.remove("ventanaMenuSeleccion");

                    this.juegoDiv.classList.add("juegoDesactivado")
                    this.menuDeSeleccion.classList.add("ventanaMenuSeleccionActivada");
                }
            })
        });
    }

    obtenerConfiguraciones() {
        let modoSeleccionado;
        for (let [modo, configuracion] of this.modosDeJuego) {
            if(modo === this.modoDeJuego) {
                modoSeleccionado = [modo, configuracion];
            }
        }

        return modoSeleccionado;
    }

    dibujarFondo() {
        this.ctx.drawImage(this.skin, 0, 0, 1050, 580);
    }

    async dibujar() {
        this.dibujarFondo();
        if(this.juegoIniciado) {
            await this.tablero.dibujar(this.juegoIniciado)
        } else {
            this.tablero.dibujar(this.juegoIniciado);
        }
        this.zona1.dibujarZonaFichas();
        this.zona2.dibujarZonaFichas();
        this.jugador1.dibujarFichas();
        this.jugador2.dibujarFichas();
        this.jugador1.dibujarSkin();
        this.jugador2.dibujarSkin();
    }

    clear() {
        this.ctx.fillStyle = 'rgb(179, 179, 179)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    onMouseDown(e) {
        if(!this.juegoFinalizado) {
            if(!this.terminoTemporizador()) {
                this.isMouseDown = true;
        
                if(this.lastClickedFigure != null) {
                    this.lastClickedFigure.setSeleccionada(false);
                    this.lastClickedFigure = null;
                }

                this.clickedFigure = this.turnoJugador.getClickedFicha(e.offsetX, e.offsetY);

                if(this.clickedFigure != null && this.esFichaValida(this.turnoJugador)) {
                    /*
                        Si hay una figura clickeada , seteo el estado de la ficha y guardo la referencia a esa figura
                        Me sirve para saber que ficha sse esta moviendo
                    */
                    this.clickedFigure.setSeleccionada(true);
                    this.clickedFigure.setIsTurn(false);
                    this.clear();
                    this.dibujar();

                    /*
                        Estas posiciones me sirven para dibujar la ficha en su posicion original si no fue soltada
                        en la posicion valida
                    */
                    this.posXClickedFigure = this.clickedFigure.getPosX();
                    this.posYClickedFigure = this.clickedFigure.getPosY();
                    this.lastClickedFigure = this.clickedFigure;
                            
                    this.canvas.addEventListener('mousemove', e => { this.onMouseMove(e); }, false);
                } 
            } else {
                this.finalizar(`Ups! Se te acabo el tiempo ${this.turnoJugador.getNombre()}`);
            }
        }
    }

    
    /*
        Ademas de verificar si es la primera ficha del todo el mazo
        tengo que verificar si es la ficha correspondiente al jugador que le toca el turno
    */
    esFichaValida(jugador) {
        return jugador.contieneFicha(this.clickedFigure) && jugador.esJugable(this.clickedFigure);
    }

    onMouseMove(e) {
        if(!this.juegoFinalizado) {
            if(!this.terminoTemporizador()) {
                if(this.isMouseDown && this.lastClickedFigure != null) {
                    //Si e.layerX es menor a la posX del rec y e.layerY es menor a la posY del rec:
                    this.lastClickedFigure.setPosicion(e.offsetX, e.offsetY);

                    if(this.esPosicionValida(e.offsetX, e.offsetY)) {
                        if(this.casilleroReceptor != null)
                            this.casilleroReceptor.setIsHovered(false);

                        this.casilleroReceptor = this.tablero.buscarCasilleroReceptorDe(this.lastClickedFigure);
                        this.casilleroReceptor.setIsHovered(true);
                    } else {
                        if(this.casilleroReceptor != null)
                            this.casilleroReceptor.setIsHovered(false);
                    }
                  
                    this.clear();
                    this.dibujar();
                }
            } else {
                this.finalizar(`Ups! Se te acabo el tiempo`);
            }
        }
    }

    async onMouseUp(e) {
        this.isMouseDown = false;

        if(!this.juegoFinalizado) {
            if(!this.terminoTemporizador()) {
                // Logica para verificar que la ficha se suelte en la ubicacion correcta
                if(this.lastClickedFigure != null && !this.isMouseDown) {
                    this.lastClickedFigure.setSeleccionada(false);
                    this.casilleroReceptor.setIsHovered(false);
                    // Si se solto en la posicion valida
                    if(this.esPosicionValida(e.offsetX, e.offsetY)) {
                        this.clear();
                        this.dibujar();
                        
                        let receptor = this.tablero.buscarCasilleroReceptorDe(this.lastClickedFigure);
                        let indexCasilleroReceptor = this.tablero.buscarIndiceDeCasillero(receptor);
                        if(indexCasilleroReceptor != -1) {
                            this.casilleroEncontrado = this.tablero.sePuedeDibujar(indexCasilleroReceptor);
                            //Si se puede dibujar
                            if(this.casilleroEncontrado != null ) {
                                await this.ejecutarAnimacion(this.lastClickedFigure.getPosY(), this.casilleroEncontrado.getPosXArc(), this.casilleroEncontrado.getPosYArc());
                                let posicionArc = this.casilleroEncontrado.getPosicionArc();
                                this.lastClickedFigure.setPosicion(posicionArc.x, posicionArc.y);
                                this.casilleroEncontrado.setFicha(this.lastClickedFigure);
                                /*
                                    Para eliminar lastClickedFigure del arreglo el metodo shift() no sirve porque aun asi
                                    el array sigue manteniendo la referencia a la ficha. En su lugar, usamos splice()
                                */
                                //Si es el turno del jugador 1
                                if(this.turnoJugador.getNombre() == this.jugador1.getNombre()) {
                                    this.jugador1.eliminarFicha(this.lastClickedFigure);
                                    this.jugador1.reacomodarFichas(this.posYMenosFicha);
                                } else {
                                    this.jugador2.eliminarFicha(this.lastClickedFigure);
                                    this.jugador2.reacomodarFichas(this.posYMenosFicha);
                                }

                                //Una vez que dibuje la ficha, compruebo quien gano
                                setTimeout(() => {
                                    if(this.hayGanador(this.casilleroEncontrado)) {
                                        this.jugadorGanador = this.encontrarJugadorGanador();
                                        this.finalizar(`Gano ${this.jugadorGanador.getNombre()}!!`);
                                    }
    
                                    if(this.hayEmpate()) {
                                        this.finalizar("Empate!! Felicitaciones a los dos!");
                                    }
                                }, 180)

                                if(this.turnoJugador.getNombre() === this.jugador1.getNombre()) {
                                    this.turnoJugador.setTurn(false);
                                    this.turnoJugador = this.jugador2;

                                    if(!this.juegoFinalizado) {
                                        this.turnoJugador.setTurn(true);
                                        this.turnoJugador.setFichaTurn(true);
                                        this.clear();
                                        this.dibujar();
                                    }
                                } else {
                                    this.turnoJugador.setTurn(false);
                                    this.clear();
                                    this.dibujar();
                                    this.turnoJugador = this.jugador1;

                                    if(!this.juegoFinalizado) {
                                        this.turnoJugador.setTurn(true);
                                        this.turnoJugador.setFichaTurn(true);
                                        this.clear();
                                        this.dibujar();
                                    }
                                }
                            } else {
                                this.turnoJugador.setFichaTurn(true);
                                this.lastClickedFigure.setPosicion(this.posXClickedFigure, this.posYClickedFigure);
                                this.clear();
                                this.dibujar();
                            }
                        }
                    } else {
                        this.turnoJugador.setFichaTurn(true);
                        this.lastClickedFigure.setPosicion(this.posXClickedFigure, this.posYClickedFigure);
                        this.clear();
                        this.dibujar();
                    }
                }
            } else {
                this.finalizar(`Ups! Se te acabo el tiempo`);
            }
        }
        this.velocidadY = 0;
    }

    ejecutarAnimacion(posYFicha, posXCasillero, posYCasillero) {
        return new Promise((resolve) => {
            this.velocidadY += this.gravedad;
            posYFicha += this.velocidadY;
    
            this.lastClickedFigure.setPosY(posYFicha);
            this.lastClickedFigure.setPosX(posXCasillero);
            if(posYFicha + this.lastClickedFigure.getRadius() >= posYCasillero) {
                this.lastClickedFigure.setPosY(posYCasillero);
                this.clear();
                this.dibujar();
                resolve();
            } else {
                this.clear();
                this.dibujar();
                setTimeout(() => {
                    this.ejecutarAnimacion(posYFicha, posXCasillero, posYCasillero).then(resolve); 
                }, 1);
            }
        })

        // this.lastClickedFigure.dibujar();

        // if (posY < limite)
        //     setTimeout(this.ejecutarAnimacion, 100);
        // else
        //     console.log("La caída ha terminado");
    }

    hayGanador(casillero) {
        return this.tablero.hayGanador(casillero);
    }

    hayEmpate() {
        return !this.jugador1.tieneFichasJugables() && !this.jugador2.tieneFichasJugables();
    }

    encontrarJugadorGanador() {
        if(this.turnoJugador.getNombre() === this.jugador1.getNombre())
            return this.jugador1;

        return this.jugador2;
    }

    esPosicionValida(posX, posY) {
        return this.esPosXValida(posX) && this.esPosYValida(posY);
    }

    esPosXValida(posX) {
        return posX > this.tablero.getPosXIniAreaRecepcion() && posX < this.tablero.getPosXFinAreaRecepcion(); 
    }

    esPosYValida(posY) {
        return posY > this.tablero.getPosYIniAreaRecepcion() && posY < (this.tablero.getPosYIniAreaRecepcion() + this.tablero.getHeightRect());
    }

    ejecutarTemporizador() {
        this.temporizadorElemento.innerHTML = `${this.contador}`;

        this.temporizador = setInterval(() => {
            if(this.contador > 0) {
                this.contador -= 1;
                this.temporizadorElemento.innerHTML = `${this.contador}`;
            } else {
                this.temporizadorFinalizado = true;
                this.finalizar(`Ups! Se acabo el tiempo`)
                clearInterval(this.temporizador);
            }
        }, 1000);
    }

    // dibujarTemporizador() {
    //     this.ctx.font = '33px Russo One';
    //     this.ctx.fillStyle = 'rgb(179, 179, 179)';
    //     this.ctx.lineWidth = 3;
    //     this.ctx.strokeStyle = 'black';
    //     this.ctx.strokeText(this.contador, this.posXTemporizador, this.posYTemporizador);
    //     this.ctx.fillText(this.contador, this.posXTemporizador, this.posYTemporizador);
    // }

    terminoTemporizador() {
        return this.temporizadorFinalizado;
    }

    finalizarTemporizador() {
        clearInterval(this.temporizador);
    }
}
