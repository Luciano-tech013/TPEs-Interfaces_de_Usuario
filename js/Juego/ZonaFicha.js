class ZonaFicha {
    constructor(ctx, posX, posY, width, height, color) {
        this.ctx = ctx;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    
    dibujarZonaFichas() {
        // Aseguramos que el radio no sea mayor que la mitad del ancho o alto del rectángulo
        let radius = Math.min(this.radius, this.width / 2, this.height / 2);

        this.ctx.beginPath();
        this.ctx.moveTo(this.posX + radius, this.posY); // Comienza en la esquina superior izquierda, desplazado por el radio
        this.ctx.lineTo(this.posX + this.width - radius, this.posY); // Línea superior
        this.ctx.quadraticCurveTo(this.posX + this.width, this.posY, this.posX + this.width, this.posY + radius); // Esquina superior derecha
        this.ctx.lineTo(this.posX + this.width, this.posY + this.height - radius); // Línea derecha
        this.ctx.quadraticCurveTo(this.posX + this.width, this.posY + this.height, this.posX + this.width - radius, this.posY + this.height); // Esquina inferior derecha
        this.ctx.lineTo(this.posX + radius, this.posY + this.height); // Línea inferior
        this.ctx.quadraticCurveTo(this.posX, this.posY + this.height, this.posX, this.posY + this.height - radius); // Esquina inferior izquierda
        this.ctx.lineTo(this.posX, this.posY + radius); // Línea izquierda
        this.ctx.quadraticCurveTo(this.posX, this.posY, this.posX + radius, this.posY); // Esquina superior izquierda
        this.ctx.closePath();

        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }
}