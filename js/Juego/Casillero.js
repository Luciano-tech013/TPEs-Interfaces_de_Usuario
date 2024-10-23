class Casillero {
    constructor(posRectX, posRectY, posArcX, posArcY, width, height, color, receptor, ctx) {
        this.ficha = null;
        this.posRectX = posRectX;
        this.posRectY = posRectY;
        this.posArcX = posArcX;
        this.posArcY = posArcY;
        this.width = width;
        this.height = height;
        this.radius = width / 2.5; //Cuenta estatica para obtener el radio perfecto del circulo en el rectangulo
        this.color = color;
        this.receptor = receptor;
        this.ctx = ctx;
    }

    getPosXRect() {
        return this.posRectX;
    }

    getPosYRect() {
        return this.posRectY;
    }

    setFicha(ficha) {
        this.ficha = ficha;
    }

    tieneFicha() {
        return this.ficha == null;
    }

    drawRectangulo() {
        //Rectangulo
        if(!this.receptor) {
            this.ctx.strokeStyle = 'black';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(this.posRectX, this.posRectY, this.width, this.height); 
        }

        this.ctx.fillStyle = this.color;      
        this.ctx.fillRect(this.posRectX, this.posRectY, this.width, this.height);
    }

    drawArco() {
        //Circulo
        this.ctx.fillStyle = `rgba(255, 0, 0, 255)`;
        this.ctx.beginPath();
        this.ctx.arc(this.posArcX, this.posArcY, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawCasillero() {
        this.drawRectangulo();
        
        if(!this.receptor)
            this.drawArco();
    }

    isPointInside(x, y) {
        console.log("x ficha: " + x, "y ficha: " + y, "posX: " + this.posRectX, "posY: " + this.posRectY);
        return ((x > this.posRectX && x < (this.posRectX + this.width)) && (y > this.posRectY && y < (this.posRectY + this.height)));
    }

}