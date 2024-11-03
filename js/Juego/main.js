
const ventanaEjecucion = document.querySelector(".ventanaEjecucion");
const ventanaEjecucionPlay = document.querySelector(".ventanaEjecucionPlay");
const ventanaMenuSeleccion = document.querySelector(".ventanaMenuSeleccion");
const juegoDiv = document.querySelector(".juegoDesactivado");
const botonPlayInicializar = document.querySelector(".home__carrousell__card__footer__button__play__ejecucion");
const botonPlayEjecutar = document.querySelector(".home__carrousell__card__footer__button__play__menu");
const skinsFicha1 = document.querySelectorAll(".skinFicha1");
const skinsFicha2 = document.querySelectorAll(".skinFicha2");
const modosDejuego = document.querySelectorAll(".modo");
const skinsFondo = document.querySelectorAll(".skinFondo");
const nombreJugador1 = document.querySelector("#nombre1");
const nombreJugador2 = document.querySelector("#nombre2");

let skinFicha1;
let skinFicha2;
let nombre1;
let nombre2;
let modoDeJuego;
let skinFondo;

let skin1Correcta = true;
let skin2Correcta = true;
let modoDeJuegoCorrecto = true;
let nombreCorrecto1 = true;
let nombreCorrecto2 = true;
let skinFondoCorrecto = true;

let skinSeleccionada1;
let skinSeleccionada2;
let modoSeleccionado;
let nombreSeleccionado1;
let nombreSeleccionado2;
let skinFondoSeleccionada;

skinsFicha1.forEach(skin1 => {
    skin1.addEventListener("click", () => {
        if(!skin1Correcta) {
            eliminarBordeRojo(skinsFicha1, skinSeleccionada1);
            skin1Correcta = true;
        }

        if(skinSeleccionada1 != undefined) {
            skinSeleccionada1.style.border = "";
        }

        skinSeleccionada1 = skin1;
        skinFicha1 = skin1;
        skinSeleccionada1.style.border = "4px solid rgba(0, 200, 0, 1)";
        skinSeleccionada1.style.borderRadius = "50%";
    })
})

skinsFicha1.forEach(skin1 => {
    skin1.addEventListener("mouseenter", () => {
        if(skinSeleccionada1 !== skin1) {
            skin1.style.border = "4px solid rgba(0, 200, 0, 1)";
            skin1.style.borderRadius = "50%";
        }
    })
})

skinsFicha1.forEach(skin1 => {
    skin1.addEventListener("mouseleave", () => {
        if(skinSeleccionada1 !== skin1) {
            skin1.style.border = "";
        }

        if(!skin1Correcta) {
            skin1.style.border = "5px solid red"
        }
    })
})
    
skinsFicha2.forEach(skin2 => {
    skin2.addEventListener("click", () => {
        if(!skin2Correcta) {
            eliminarBordeRojo(skinsFicha2, skinSeleccionada2);
            skin2Correcta = true;
        }

        if(skinSeleccionada2 != undefined)
            skinSeleccionada2.style.border = "";

        skinSeleccionada2 = skin2;
        skinFicha2 = skin2;
        skinSeleccionada2.style.border = "4px solid rgba(0, 200, 0, 1)";
        skinSeleccionada2.style.borderRadius = "50%";
    })
})

skinsFicha2.forEach(skin2 => {
    skin2.addEventListener("mouseenter", () => {
        if(skinSeleccionada2 !== skin2) {
            skin2.style.border = "4px solid rgba(0, 200, 0, 1)";
            skin2.style.borderRadius = "50%";
        }
    })
})

skinsFicha2.forEach(skin2 => {
    skin2.addEventListener("mouseleave", () => {
        if(skinSeleccionada2 !== skin2) {
            skin2.style.border = "";
        }

        if(!skin2Correcta) {
            skin2.style.border = "5px solid red";
        }
    })
})

nombreJugador1.addEventListener("focus", () => {
    nombreJugador1.style.border = "4px solid rgba(0, 200, 0, 1)";
})

nombreJugador1.addEventListener("blur", () => {
    nombreJugador1.style.border = "";
    nombreCorrecto1 = true;
    nombre1 = nombreJugador1.value;
})

nombreJugador2.addEventListener("focus", () => {
    nombreJugador2.style.border = "4px solid rgba(0, 200, 0, 1)";
})

nombreJugador2.addEventListener("blur", () => {
    nombreJugador2.style.border = "";
    nombreCorrecto2 = true;
    nombre2 = nombreJugador2.value;
})
    
modosDejuego.forEach(modo => {
    modo.addEventListener("click", () => {
        if(!modoDeJuegoCorrecto) {
            eliminarBordeRojo(modosDejuego, modoSeleccionado);
            modoDeJuegoCorrecto = true;
        }

        if(modoSeleccionado != undefined)
            modoSeleccionado.style.border = "";

        modoSeleccionado = modo;
        modoDeJuego = modo;
        modoSeleccionado.style.border = "4px solid rgba(0, 200, 0, 1)";
        modoSeleccionado.style.borderRadius = "50%";
    })
})

modosDejuego.forEach(modo => {
    modo.addEventListener("mouseenter", () => {
        if(modoSeleccionado !== modo) {
            modo.style.border = "4px solid rgba(0, 200, 0, 1)";
            modo.style.borderRadius = "50%";
        }
    })
})

modosDejuego.forEach(modo => {
    modo.addEventListener("mouseleave", () => {
        if(modoSeleccionado !== modo) {
            modo.style.border = "";
        }

        if(!modoDeJuegoCorrecto) {
            modo.style.border = "5px solid red";
        }
    })
})

skinsFondo.forEach(fondo => {
    fondo.addEventListener("click", () => {
        if(!skinFondoCorrecto) {
            eliminarBordeRojo(skinsFondo, skinFondoSeleccionada);
            skinFondoCorrecto = true;
        }

        if(skinFondoSeleccionada != undefined)
            skinFondoSeleccionada.style.border = "";

        skinFondoSeleccionada = fondo;
        skinFondo = fondo;
        skinFondoSeleccionada.style.border = "4px solid rgba(0, 200, 0, 1)";
    })
})

skinsFondo.forEach(skinFondo => {
    skinFondo.addEventListener("mouseenter", () => {
        if(skinFondoSeleccionada !== skinFondo) {
            skinFondo.style.border = "4px solid rgba(0, 200, 0, 1)";
        }
    })
})

skinsFondo.forEach(skinFondo => {
    skinFondo.addEventListener("mouseleave", () => {
        if(skinFondoSeleccionada !== skinFondo) {
            skinFondo.style.border = "";
        }

        if(!skinFondoCorrecto) {
            skinFondo.style.border = "5px solid red";
        }
    })
})

botonPlayInicializar.addEventListener("click", () => {
    ventanaEjecucion.classList.remove(".ventanaEjecucion")
    ventanaEjecucionPlay.classList.remove(".ventanaEjecucionPlay")
    ventanaEjecucion.classList.add("ventanaEjecucionDesactivada");
    ventanaEjecucionPlay.classList.add("ventanaEjecucionPlayDesactivada");
    mostrarMenu()
});

botonPlayEjecutar.addEventListener("click", () => {
    if(configuracionCorrecta()) {
        ventanaMenuSeleccion.classList.remove("ventanaMenuSeleccion");
        ventanaMenuSeleccion.classList.add("ventanaMenuSeleccion");
        ejecutarJuego();
    }
});

function eliminarBordeRojo(elementos, noEliminar) {
    for(let elemento of elementos) {
        if(elemento !== noEliminar) {
            elemento.style.border = "";
        }
    }
}

function mostrarMenu() {
    ventanaMenuSeleccion.classList.remove("ventanaMenuSeleccion")
    ventanaMenuSeleccion.classList.add("ventanaMenuSeleccionActivada");
}

function configuracionCorrecta() {
    if(skinFicha1 == undefined) {
        skin1Correcta = false;

        for(let skin1 of skinsFicha1) {
            skin1.style.borderRadius = "50%";
            skin1.style.border = "5px solid red";
        }
    }
        
    if(skinFicha2 == undefined) {
        skin2Correcta = false;

        for(let skin2 of skinsFicha2) {
            skin2.style.borderRadius = "50%";
            skin2.style.border = "5px solid red";
        }
    }

    if(modoDeJuego == undefined) {
        modoDeJuegoCorrecto = false;

        for(let modo of modosDejuego) {
            modo.style.borderRadius = "50%";
            modo.style.border = "5px solid red";
        }
    }

    if(skinFondo == undefined) {
        skinFondoCorrecto = false;

        for(let skinFondo of skinsFondo) {
            skinFondo.style.border = "5px solid red";
        }
    }

    if(nombre1 == null) {
        nombreCorrecto1 = false;
        nombreJugador1.style.border = "5px solid red";
    }

    if(nombre2 == null) {
        nombreCorrecto2 = false;
        nombreJugador2.style.border = "5px solid red";
    }

    return (skin1Correcta && skin2Correcta && modoDeJuegoCorrecto && skinFondoCorrecto && nombreCorrecto1 && nombreCorrecto2);
}

function ejecutarJuego() {
    juegoDiv.classList.remove("juegoDesactivado");
    juegoDiv.classList.add("juegoActivado");

    const canvasJuego = document.getElementById("canvasJuego");
    const juego = new Juego(canvasJuego, skinFondo.getAttribute("src"));

    let modoDeJuegoSeleccionado = modoDeJuego.children[0].innerHTML;
    juego.inicializar(modoDeJuegoSeleccionado, nombre1, nombre2, skinFicha1.getAttribute("src"), skinFicha2.getAttribute("src"));
    canvasJuego.addEventListener('mousedown', e => { juego.onMouseDown(e); }, false);
    canvasJuego.addEventListener('mouseup', e => { juego.onMouseUp(e); }, false);
}




