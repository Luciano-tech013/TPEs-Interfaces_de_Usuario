class Ficha {
    constructor(posX, posY, radius, url, resaltado, jugador, ctx) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.ctx = ctx;
        this.jugador = jugador;
        this.seleccionada = false;
        this.isTurn = false;
        this.skin = new Image();
        this.resaltado = resaltado;
        this.skinCargada = false;
        this.setSkin(url);
    }

    setSkin(url) {
        this.skin.src = url;
        this.skin.onload = () => {
            this.skinCargada = true;
            //this.dibujar();
        }
    }

    getPosX() {
        return this.posX
    }

    getPosY() {
        return this.posY;
    }

    getRadius() {
        return this.radius;
    }

    setPosX(posX) {
        this.posX = posX;
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

    setIsTurn(isTurn) {
        this.isTurn = isTurn;
    }

    dibujar() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "rgba(7, 7, 7, 0.9)";
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);

        if(this.seleccionada) {
            this.ctx.strokeStyle = this.resaltado;   
            this.ctx.lineWidth = 3; 
            this.ctx.stroke();
        }
            
        if(this.isTurn) {
            this.ctx.strokeStyle = 'rgba(0, 200, 0, 1)';
            this.ctx.lineWidth = 5; 
            this.ctx.stroke();
        }

        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.drawImage(this.skin, this.posX-this.radius, this.posY-this.radius, this.radius * 2, this.radius * 2); 
    }

    clear() {
        this.ctx.clearRect(this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);
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
