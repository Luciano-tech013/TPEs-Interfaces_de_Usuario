class Jugador {
    constructor(id, nombre, skin, resaltado, posXSkin, posYSkin, posXSkinText, posYSkinText, cantFichas, ctx) {
        this.ctx = ctx;
        this.id = id;
        this.nombre = nombre;
        this.fichas = [];
        this.posXSkin = posXSkin;
        this.posYSkin = posYSkin;
        this.posXSkinText = posXSkinText;
        this.posYSkinText = posYSkinText;
        this.skinFicha = skin;
        this.skinJugador = new Image();
        this.cantFichas = cantFichas;
        this.resaltadoSkin = resaltado;
        this.resaltadoNombre = 'rgba(0, 200, 0, 1)';
        this.myTurn = false;
        this.setSkin();
    }

    getId() {
        return this.id;
    }

    getNombre() {
        return this.nombre;
    }

    addFicha(ficha) {
        if(!this.fichas.includes(ficha))
            this.fichas.push(ficha);
    }

    setTurn(myTurn) {
        this.myTurn = myTurn;
    }

    setFichaTurn(isTurn) {
        let pos = this.fichas.length-1;
        this.fichas[pos].setIsTurn(isTurn);
    }

    setSkin() {
        this.skinJugador.src = this.skinFicha;
        this.skinJugador.onload = () => {
            this.dibujarSkin();
        }
    }

    dibujarFichas() {
        for(let i = 0; i < this.fichas.length; i++) {
            this.fichas[i].dibujar();
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

    reacomodarFichas(posYMenos) {
        let ficha;
        for(let i = 0; i < this.fichas.length; i++) {
            ficha = this.fichas[i];
            ficha.setPosY(ficha.getPosY() - posYMenos);
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
        this.ctx.beginPath();
        this.ctx.fillStyle = 'black';
        if(this.myTurn)
            this.ctx.strokeStyle = this.resaltadoSkin;
        this.ctx.lineWidth = 3;
        this.ctx.arc(this.posXSkin, this.posYSkin, this.radius, 0, 1.5 * Math.PI);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.drawImage(this.skinJugador, this.posXSkin, this.posYSkin, 90, 90); 
        this.dibujarNombre();
    }

    dibujarNombre() {
        if(this.myTurn) {
            this.ctx.strokeStyle = this.resaltadoNombre;
        } else {
            this.ctx.strokeStyle = 'black';
        }
        this.ctx.fillStyle = this.resaltadoSkin;
        this.ctx.font = '22px Russo One';
        this.ctx.lineWidth = 7;
        this.ctx.strokeText(this.nombre, this.posXSkin + this.posXSkinText, this.posYSkin + this.posYSkinText);
        this.ctx.fillText(this.nombre, this.posXSkin + this.posXSkinText, this.posYSkin + this.posYSkinText);
    }
}