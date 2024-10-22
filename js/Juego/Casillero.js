class Casillero {
    constructor(posRectX, posRectY, posArcX, posArcY, width, height, ctx) {
        this.ficha = null;
        this.posRectX = posRectX;
        this.posRectY = posRectY;
        this.posArcX = posArcX;
        this.posArcY = posArcY;
        this.width = width;
        this.height = height;
        this.radius = width / 2.5; //Cuenta estatica para obtener el radio perfecto del circulo en el rectangulo
        this.ctx = ctx;
    }

    setFicha(ficha) {
        this.ficha = ficha;
    }

    tieneFicha() {
        return this.ficha == null;
    }

    draw() {
        //Rectangulo
        this.ctx.fillStyle = `rgba(0, 170, 0, 255)`;
        this.ctx.strokeStyle = 'black',
        this.ctx.lineWidth = 1;
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