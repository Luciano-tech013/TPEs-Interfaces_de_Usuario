class Ficha {
    constructor(posX, posY, radius, url, resaltado, jugador, ctx) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.ctx = ctx;
        this.jugador = jugador;
        this.seleccionada = false;
        this.skin = new Image();
        this.resaltado = 'black';
        this.skinCargada = false;
        this.setSkin(url);
    }

    setSkin(url) {
        this.skin.src = url;
        this.skin.onload = () => {
            this.skinCargada = true;
        }
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

    getJugador() {
        return this.jugador;
    }

    setJugador(jugador) {
        this.jugador = jugador;
    }

    setPosicion(x, y) {
        this.posX = x;
        this.posY = y;
    }

    dibujar() {
        if(this.skinCargada) {
            this.ctx.drawImage(this.skin, this.posX-this.radius, this.posY-this.radius, this.radius * 2, this.radius * 2);
            this.ctx.beginPath();
            this.ctx.strokeStyle = this.resaltado;
            if(this.seleccionada) {
                this.ctx.lineWidth = 5;     
            } else {
                this.ctx.lineWidth = 2;
            }
            this.ctx.stroke();
            this.ctx.closePath(); 
        } 
    }

    estaSeleccionada(x, y) {
        let _x = this.posX - x;
        let _y = this.posY - y;
        return (Math.sqrt((_x *_x) + (_y *_y)) < this.radius);
    }

    esIgualA(ficha) {
        return this.jugador.esIgualA(ficha.getJugador()); 
    }


}
