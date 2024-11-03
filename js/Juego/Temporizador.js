class Temporizador {
    constructor(tiempo) {
        this.temporizadorElemento = document.querySelector("#temporizador");
        this.temporizador = 0;
        this.temporizadorFinalizado = false;
        this.contador = tiempo;
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

    terminoTemporizador() {
        return this.temporizadorFinalizado;
    }

    finalizarTemporizador() {
        clearInterval(this.temporizador);
    }

    setTiempo(tiempo) {
        this.contador = tiempo;
    }
}