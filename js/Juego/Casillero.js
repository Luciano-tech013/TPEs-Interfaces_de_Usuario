class Casillero {
    constructor(width, height, ctx) {
        this.ficha = null;
        this.posRectX = width;
        this.posRectY = height;
        this.posArcX = this.calcPosArcXInicial();
        this.posArcY = this.posRectY + (this.posRectY/2);
        this.width = width;
        this.height = height;
        this.radius = width / 2.5; //Cuenta estatica para obtener el radio perfecto del circulo en el rectangulo
        this.ctx = ctx;
    }

    /*
        Porque en la columna 1 (la inicial), el circulo se me dibuja a la izquierda del cuadrado, y se debe
        a como funciona el metodo arc(). Para eso, tengo que sumarle la mitad al eje X para que quede en la 
        posicion correcta para empezar a dibujar los arcos
    */
    calcPosArcXInicial() {
        return this.posRectX + (this.posRectX/2);
    }

    setFicha(ficha) {
        this.ficha = ficha;
    }

    getPosRectX() {
        return this.posRectX;
    }

    setPosRectX(posRectX) {
        this.posRectX = posRectX;
    }

    getPosRectY() {
        return this.posRectY;
    }

    setPosRectY(posRectY) {
        this.posRectY = posRectY;
    }

    getPosArcX() {
        return this.posArcX;
    }

    setPosArcX(posArcX) {
        this.posArcX = posArcX;
    }

    getPosArcY() {
        return this.posArcY;
    }

    setPosArcY(posArcY) {
        this.posArcY = posArcY;
    }

    tieneFicha() {
        return this.ficha == null;
    }

    draw() {
        //Rectangulo
        this.ctx.fillStyle = `rgba(0, 170, 0, 255)`;
        this.ctx.strokeStyle = 'black',
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(this.posRectX, this.posRectY, this.width, this.height);       
        this.ctx.fillRect(this.posRectX, this.posRectY, this.width, this.height);

        //Circulo
        this.ctx.fillStyle = `rgba(255, 0, 0, 255)`;
        this.ctx.beginPath();
        this.ctx.arc(this.posArcX, this.posArcY, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

}