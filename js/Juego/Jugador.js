class Jugador {
    constructor(id, nombre, skin, resaltado, posX, posXSkin, posYSkin, posXSkinText, posYSkinText, cantFichas, ctx) {
        this.id = id;
        this.nombre = nombre;
        this.fichas = [];
        this.posX = posX;
        this.posY = 550;
        this.posXSkin = posXSkin;
        this.posYSkin = posYSkin;
        this.posXSkinText = posXSkinText;
        this.posYSkinText = posYSkinText;
        this.radius = 90/2.5;
        this.skinFicha = skin;
        this.skinJugador = new Image();
        this.resaltado = resaltado
        this.ctx = ctx;
        this.cantFichas = cantFichas;
        this.temporizador = null;
        this.cargarFichas();
        this.setSkin();
    }

    getId() {
        return this.id;
    }

    getNombre() {
        return this.nombre;
    }

    cargarFichas() {
        for(let i = 0; i < this.cantFichas; i++) {
            this.fichas.push(new Ficha(this.posX, this.posY, this.radius, this.skinFicha, this.resaltado, this, this.ctx));
            this.posY -= 18;
        }
    }

    setSkin() {
        this.skinJugador.src = this.skinFicha;
        this.skinJugador.onload = () => {
            this.dibujarSkin();
        }
    }

    mostrarFichas(juegoIniciado) {
        for(let i = 0; i < this.fichas.length; i++) {
            if(juegoIniciado) {
                setTimeout(() => {
                    this.fichas[i].dibujar();
                }, 80 * i);
            } else {
                this.fichas[i].dibujar();
            }
        }
    }

    contieneFicha(ficha) {
        return this.fichas.includes(ficha);
    }

    /*
        Para chekear que la ficha clickeada sea la primera ficha del mazo
        (a eso le llamo ficha jugable)
    */
    esJugable(fichaClickeada) {
        let posUltimaFicha = this.fichas.length-1;
        let posClickedFigure = this.fichas.indexOf(fichaClickeada);
        
        if(posClickedFigure != -1)
            return posClickedFigure == posUltimaFicha;

        return false;
    }

    eliminarFicha(ficha) {
        let index = this.fichas.indexOf(ficha);
        if (index !== -1) 
            this.fichas.splice(index, 1);
    }

    reacomodarFichas() {
        let ficha;
        for(let i = 0; i < this.fichas.length; i++) {
            ficha = this.fichas[i];
            ficha.setPosY(ficha.getPosY() - 20);
        }
    }

    tieneFichasJugables() {
        return this.fichas.length > 0;
    }

    getClickedFicha(x, y) {
        let ficha;
        for(let i = this.fichas.length-1; i >= 0; i--) {
            ficha = this.fichas[i];
            if(ficha.estaSeleccionada(x, y)) {
                return ficha;
            }
        }
    }

    esIgualA(jugador) {
        return this.id == jugador.getId();
    }

    dibujarSkin() {
        //Preguntar si a la imagen se le puede hacer un resaltado para marcarle al usuario de quien es el usuario con color verde
        this.ctx.drawImage(this.skinJugador, this.posXSkin, this.posYSkin, 80*1.5, 80*1.5);
        this.ctx.beginPath();
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        this.ctx.closePath(); 
        this.dibujarNombre();
    }

    dibujarNombre() {
        this.ctx.fillStyle = this.resaltado;
        this.ctx.font = '100pt Jersey 25';
        this.ctx.fillText(this.nombre, this.posXSkin + this.posXSkinText, this.posYSkin + this.posYSkinText);
    }
}