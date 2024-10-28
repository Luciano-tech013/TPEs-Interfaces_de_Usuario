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

    tieneFicha() {
        return this.ficha != null;
    }

    dibujarRectangulo() {
        //Rectangulo
        if(!this.receptor) {
            this.ctx.strokeStyle = 'black';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(this.posRectX, this.posRectY, this.width, this.height); 
            this.ctx.fillStyle = this.color;  
        } else {
            this.ctx.fillStyle = `rgba(179, 179, 179, 0.2)`;        
        }

        this.ctx.fillRect(this.posRectX, this.posRectY, this.width, this.height); 
    }

    dibujarArco() {
        //Circulo
        this.ctx.fillStyle = `rgba(179, 179, 179, 0.3)`;
        this.ctx.beginPath();
        this.ctx.arc(this.posArcX, this.posArcY, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

    dibujar() {
        this.dibujarRectangulo();

        if(this.tieneFicha())
            this.ficha.dibujar();
        else {
            if(!this.receptor)
                this.dibujarArco();
        }
    }

    isPointInside(x, y) {
        return ((x > this.posRectX && x < (this.posRectX + this.width)) && (y > this.posRectY && y < (this.posRectY + this.height)));
    }

    contiene(ficha) {
        return this.ficha.esIgualA(ficha);
    }

}