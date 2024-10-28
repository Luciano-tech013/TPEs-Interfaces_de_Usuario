class Juego {
    constructor(canvas) { 
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.modosDeJuego = new Map([
            [4, {divisorX: 4.5, dimension: 0, width: 0}], 
            [5, {divisorX: 4.5, dimension: 1, width: 20}], 
            [6, {divisorX: 4.5, dimension: 2, width: 20}], 
            [7, {divisorX: 4.5, dimension: 3, width: 20}]
        ]);
        this.isMouseDown = true;
        this.lastClickedFigure = null;
        this.clickedFigure = null;
        this.posXClickedFigure = 0;
        this.posYClickedFigure = 0;
        this.nombreJugador1 = null;
        this.nombreJugador2 = null;
        this.turnoJugador = null;
        this.turnoJugadorElemento = null;
        this.jugadorGanador = null;
        this.juegoIniciado = false;
        this.juegoFinalizado = false;
        this.jugador1 = null;
        this.jugador2 = null;
        this.skinJugador1 = "../js/Juego/skins/ficha_skin_wolverine.png";
        this.skinJugador2 = "../js/Juego/skins/ficha_skin_deadpool.jpg";
        this.modoDeJuego = null;
        this.posXTemporizador = 0;
        this.posYTemporizador = 0;
        this.temporizador = 0;
        this.temporizadorFinalizado = false;
    }

    getEstadoDelJuego() {
        return this.juegoFinalizado;
    }
    
    /*
        Para instanciar el tablero y las fichas para cada jugador (Metodo Principal)
    */
    inicializar(modoDeJuego, nombreJugador1, nombreJugador2) {
        this.juegoIniciado = true;
        this.nombreJugador1 = nombreJugador1;
        this.nombreJugador2 = nombreJugador2;
        this.turnoJugadorElemento = document.getElementById("turnoJugador");;
        this.turnoJugadorElemento.innerHTML = `Turno de ${this.nombreJugador1}`;
        this.inicializarTablero(parseInt(modoDeJuego));
        this.inicializarJugadores();
        this.turnoJugador = this.nombreJugador1;
        this.tablero.setJuegoIniciado(true);
        this.dibujar();
        this.tablero.setJuegoIniciado(false);
        this.juegoIniciado = false;
        this.modoDeJuego = modoDeJuego;
        this.ejecutarTemporizador(30);
    }

    inicializarTablero(modoDeJuego) {
        this.tablero = new Tablero(this.ctx, "../js/Juego/skins/tablero_skin_fighter.jpeg", modoDeJuego, this.modosDeJuego);
        this.cantFichas = ((this.tablero.getMaxFila()-1) * this.tablero.getMaxCol()) / 2;
    }

    inicializarJugadores() {
        this.jugador1 = new Jugador(1, this.nombreJugador1, this.skinJugador1, "yellow", 240, 0, 0, 20, 160, this.cantFichas, this.ctx);
        this.jugador2 = new Jugador(2, this.nombreJugador2, this.skinJugador2, "red", (this.canvas.width - 230), (this.canvas.width-120), 0, 0, 160, this.cantFichas, this.ctx);
    }

    finalizar(msg) {
        this.juegoFinalizado = true;
        const ganadorElemento = document.getElementById("ganador");
        const menuDeFinalizacion = document.querySelector(".juego_finalizado_container");
        const juegoEnFinalizacion = document.querySelector(".juego");

        ganadorElemento.innerHTML = msg;
        menuDeFinalizacion.classList.add("juego_finalizado_container_activado");
        juegoEnFinalizacion.classList.add("juego_en_finalizacion");
        const opciones = document.querySelectorAll(".home__carrousell__card__footer__button__play");

        let opcionClickeada;
        opciones.forEach(opcion => {
            opcion.addEventListener("click", () => {
                opcionClickeada = opcion.children[0];
                if(opcionClickeada.innerHTML === "Reiniciar") {
                    this.inicializar(this.modoDeJuego, this.nombreJugador1, this.nombreJugador2);
                    menuDeFinalizacion.classList.remove("juego_finalizado_container_activado");
                    juegoEnFinalizacion.classList.remove("juego_en_finalizacion");
                    this.juegoFinalizado = false;
                } else {
                    //Cuando tenga implementado el menu, aca iria la instanciacion del menu nuevamente
                }
            })
        });
    }

    dibujar() {
        this.tablero.dibujar();
        this.jugador1.mostrarFichas(this.juegoIniciado);
        this.jugador2.mostrarFichas(this.juegoIniciado);
        this.jugador1.dibujarSkin();
        this.jugador2.dibujarSkin();
    }

    onMouseDown(e) {
        if(!this.juegoFinalizado) {
            if(!this.terminoTemporizador()) {
                this.isMouseDown = true;
        
                if(this.lastClickedFigure != null) {
                    this.lastClickedFigure.setSeleccionada(false);
                    this.lastClickedFigure = null;
                }

                if(this.turnoJugador === this.nombreJugador1) {
                    this.clickedFigure = this.jugador1.getClickedFicha(e.offsetX, e.offsetY);
                    if(this.clickedFigure != null && this.esFichaValida(this.jugador1)) {
                        /*
                            Si hay una figura clickeada , seteo el estado de la ficha y guardo la referencia a esa figura
                            Me sirve para saber que ficha sse esta moviendo
                        */
                        this.clickedFigure.setSeleccionada(true);

                        /*
                            Estas posiciones me sirven para dibujar la ficha en su posicion original si no fue soltada
                            en la posicion valida
                        */
                        this.posXClickedFigure = this.clickedFigure.getPosX();
                        this.posYClickedFigure = this.clickedFigure.getPosY();
                        this.lastClickedFigure = this.clickedFigure;
                        this.clickedFigure.dibujar();

                        this.canvas.addEventListener('mousemove', e => { this.onMouseMove(e); }, false);
                    }    
                } else {
                    this.clickedFigure = this.jugador2.getClickedFicha(e.offsetX, e.offsetY);
                    if(this.clickedFigure != null && this.esFichaValida(this.jugador2)) {
                        /*
                            Si hay una figura clickeada , seteo el estado de la ficha y guardo la referencia a esa figura
                            Me sirve para saber que ficha sse esta moviendo
                        */
                        this.clickedFigure.setSeleccionada(true);

                        /*
                            Estas posiciones me sirven para dibujar la ficha en su posicion original si no fue soltada
                            en la posicion valida
                        */
                        this.posXClickedFigure = this.clickedFigure.getPosX();
                        this.posYClickedFigure = this.clickedFigure.getPosY();
                        this.lastClickedFigure = this.clickedFigure;
                        this.clickedFigure.dibujar();

                        this.canvas.addEventListener('mousemove', e => { this.onMouseMove(e); }, false);
                    }
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
                    this.borrarYdibujar();
                }
            } else {
                this.finalizar(`Ups! Se te acabo el tiempo ${this.turnoJugador.getNombre()}`);
            }
        }
    }

    onMouseUp(e) {
        this.isMouseDown = false;

        if(!this.juegoFinalizado) {
            if(!this.terminoTemporizador()) {
                
                // Logica para verificar que la ficha se suelte en la ubicacion correcta
                if(this.lastClickedFigure != null && !this.isMouseDown) {
                    this.lastClickedFigure.setSeleccionada(false);
                    // Si se solto en la posicion valida
                    if(this.esPosicionValida()) {
                        this.borrarYdibujar();
                        this.lastClickedFigure.dibujar();
                
                        let receptor = this.tablero.buscarCasilleroReceptorDe(this.lastClickedFigure);
                        let indexCasilleroReceptor = this.tablero.buscarIndiceDeCasillero(receptor);
                        if(indexCasilleroReceptor != -1) {
                            let casilleroEncontrado = this.tablero.sePuedeDibujar(indexCasilleroReceptor);
                            //Si se puede dibujar
                            if(casilleroEncontrado != null ) {
                                let posicionArc = casilleroEncontrado.getPosicionArc();
                                this.lastClickedFigure.setPosicion(posicionArc.x, posicionArc.y);
                                casilleroEncontrado.setFicha(this.lastClickedFigure);

                                /*
                                    Para eliminar lastClickedFigure del arreglo el metodo shift() no sirve porque aun asi
                                    el array sigue manteniendo la referencia a la ficha. En su lugar, usamos splice()
                                */
                                //Si es el turno del jugador 1
                                if(this.turnoJugador == this.nombreJugador1) {
                                    this.jugador1.eliminarFicha(this.lastClickedFigure);
                                    this.jugador1.reacomodarFichas();
                                } else {
                                    this.jugador2.eliminarFicha(this.lastClickedFigure);
                                    this.jugador2.reacomodarFichas();
                                }
                        
                                this.borrarYdibujar();
                                this.lastClickedFigure.dibujar();

                                //Una vez que dibuje la ficha, compruebo quien gano
                                //estaria bueno que el juego RESALTE las fichas que hicieron 4 en linea
                                if(this.hayGanador(casilleroEncontrado)) {
                                    this.jugadorGanador = this.encontrarJugadorGanador();
                                    this.finalizar(`Gano ${this.jugadorGanador.getNombre()}!!`);
                                }

                                if(this.hayEmpate()) {
                                    this.finalizar("Empate!! Felicitaciones a los dos!");
                                }

                                if(this.turnoJugador === this.nombreJugador1) {
                                    this.finalizarTemporizador();
                                    this.turnoJugador = this.nombreJugador2;
                                    if(!this.juegoFinalizado) {
                                        this.turnoJugadorElemento.innerHTML = `Turno de ${this.nombreJugador2}`;
                                        this.ejecutarTemporizador(30);
                                    }
                                } else {
                                    this.finalizarTemporizador();
                                    this.turnoJugador = this.nombreJugador1;
                                    if(!this.juegoFinalizado) {
                                        this.turnoJugadorElemento.innerHTML = `Turno de ${this.nombreJugador1}`;
                                        this.ejecutarTemporizador(30);
                                    }
                                }
                            } else {
                                this.lastClickedFigure.setPosicion(this.posXClickedFigure, this.posYClickedFigure);
                                this.borrarYdibujar();
                            }
                        }
                    } else {
                        // Falta checkear que cuando la ficha cae en la zona de recepcion y la sacas por accidente de ese lugar
                        // Te la dibujo ahi mismo en vez del maso. Chekearlo cuando ya tengamos lo de verificar columna (lo del if de arriba)
                        this.lastClickedFigure.setPosicion(this.posXClickedFigure, this.posYClickedFigure);
                        this.borrarYdibujar();
                    }
                }
            } else {
                this.finalizar(`Ups! Se te acabo el tiempo ${this.turnoJugador.getNombre()}`);
            }
        }
    }

    hayGanador(casillero) {
        return this.tablero.hayGanador(casillero);
    }

    hayEmpate() {
        return !this.jugador1.tieneFichasJugables() && !this.jugador2.tieneFichasJugables();
    }

    encontrarJugadorGanador() {
        if(this.turnoJugador === this.jugador1.getNombre())
            return this.jugador1;

        return this.jugador2;
    }

    clear() {
        this.ctx.fillStyle = 'rgb(179, 179, 179)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    borrarYdibujar() {
        this.clear();
        this.juegoIniciado = false;
        this.dibujar();
    }

    esPosicionValida() {
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

    ejecutarTemporizador(contador) {
        this.dibujarTemporizador(contador);

        this.temporizador = setInterval(() => {
            if(contador > 0) {
                contador--;
                this.dibujarTemporizador(contador);
            } else {
                this.temporizadorFinalizado = true;
                this.finalizar(`Ups! Se te acabo el tiempo ${this.turnoJugador.getNombre()}`)
                clearInterval(temporizador);
            }
        }, 1000);
    }

    dibujarTemporizador(contador) {
        let resaltado;
        this.ctx.font = "100pt Jersey 25";
        if(this.turnoJugador == this.nombreJugador1) {
            this.posXTemporizador = 160
            this.posYTemporizador = 20
            resaltado = 'yellow'
        } else {
            this.posXTemporizador = 1000;
            this.posYTemporizador = 20;
            resaltado = 'red';
        }
        this.ctx.fillStyle = resaltado;
        this.ctx.fillText(contador, this.posXTemporizador, this.posYTemporizador);
    }

    terminoTemporizador() {
        return this.temporizadorFinalizado;
    }

    finalizarTemporizador() {
        clearInterval(this.temporizador);
    }

}
