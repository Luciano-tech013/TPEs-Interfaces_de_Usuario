class Casillero {
    constructor(posRectX, posRectY, posArcX, posArcY, width, height, isReceptor, ctx) {
        this.ctx = ctx;
        this.ficha = null;
        this.posRectX = posRectX;
        this.posRectY = posRectY;
        this.posArcX = posArcX;
        this.posArcY = posArcY;
        this.width = width;
        this.height = height;
        this.radius = width / 3; //Cuenta estatica para obtener el radio perfecto del circulo en el rectangulo
        this.skinCasillero = new Image();
        this.isReceptor = isReceptor;
        this.isHovered = false;
        this.skinReceptor = new Image();
        this.setSkinCasillero("../js/Juego/skins/skin_tablero.jpeg");
        this.setSkinReceptor("../js/Juego/skins/brillo.jpg");
    }

    setSkinCasillero(url) {
        this.skinCasillero.src = url;
    }

    setSkinReceptor(url) {
        this.skinReceptor.src = url;
    }

    getPosXRect() {
        return this.posRectX;
    }

    getPosYRect() {
        return this.posRectY;
    }

    getPosYArc() {
        return this.posArcY;
    }

    getPosicionArc() {
        return {
            x : this.posArcX,
            y: this.posArcY
        }
    }

    getFicha() {
        return this.ficha;
    }

    setFicha(ficha) {
        this.ficha = ficha;
    }

    setIsHovered(isHovered) {
        this.isHovered = isHovered;
    }

    tieneFicha() {
        return this.ficha != null;
    }

    dibujarRectangulo() {
        //Rectangulo
        if(!this.isReceptor) {
            this.ctx.strokeStyle = 'black';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(this.posRectX, this.posRectY, this.width, this.height);
            this.ctx.drawImage(this.skinCasillero, this.posRectX, this.posRectY, this.width, this.height);
            this.ctx.fillStyle = `rgba(36, 40, 44, 0.4)`;
            this.ctx.fillRect(this.posRectX, this.posRectY, this.width, this.height); 
        } else {
            this.ctx.fillStyle = `rgba(179, 179, 179, 0.3)`;
            this.ctx.fillRect(this.posRectX, this.posRectY, this.width, this.height);
        }
        
        if(this.isHovered) {
            this.ctx.drawImage(this.skinReceptor, this.posRectX, this.posRectY, this.width, this.height);
        } 
    }

    dibujarArco() {
        //Circulo
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 3;
        this.ctx.fillStyle = `rgba(179, 179, 179, 0.3)`;
        this.ctx.beginPath();
        this.ctx.arc(this.posArcX, this.posArcY, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
    }

    dibujar() {
        this.dibujarRectangulo();

        if(!this.isReceptor)
            this.dibujarArco();

        if(this.tieneFicha())
            this.ficha.dibujar();
    }

    isPointInside(x, y) {
        return ((x > this.posRectX && x < (this.posRectX + this.width)) && (y > this.posRectY && y < (this.posRectY + this.height)));
    }

    contiene(ficha) {
        return this.ficha.esIgualA(ficha);
    }

}