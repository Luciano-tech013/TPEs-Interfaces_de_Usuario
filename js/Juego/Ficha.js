class Ficha {
    constructor(posX, posY, radius, color, ctx) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.ctx = ctx;
        this.jugador = null;
        this.seleccionada = false;
        this.color = color;
        this.resaltado = 'black';
    }

    getPosX() {
        return this.posX
    }

    getPosY() {
        return this.posY;
    }

    setPosY(posY) {
        this.posY = posY;
    }

    setSeleccionada(seleccionada) {
        this.seleccionada = seleccionada;
    }

    setJugador(jugador) {
        this.jugador = jugador;
    }

    setPosicion(x, y) {
        this.posX = x;
        this.posY = y;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.resaltado;
        if(this.seleccionada) {
            this.ctx.lineWidth = 5;     
        } else {
            this.ctx.lineWidth = 2;
        }
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
    }

    estaSeleccionada(x, y) {
        let _x = this.posX - x;
        let _y = this.posY - y;
        return (Math.sqrt((_x *_x) + (_y *_y)) < this.radius);
    }


}
