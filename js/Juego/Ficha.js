class Ficha {
    constructor(posX, posY, radius, ctx) {
        this.posX = posX - (posX/2);
        this.posY = posY - (posY/2);
        this.radius = radius;
        this.ctx = ctx;
        this.jugador = null;
        this.seleccionada = false;
        this.color = `rgba(255, 0, 0, 255)`;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

    estaSeleccionada() {
        return this.seleccionada;
    }

    setSeleccionada(seleccionada) {
        this.seleccionada = seleccionada;
    }

    setJugador(jugador) {
        this.jugador = jugador;
    }

}