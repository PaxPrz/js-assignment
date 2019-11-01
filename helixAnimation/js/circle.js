class Circle{
    static MAX_RADIUS = 20;

    constructor(index, context, isUp, hIndex, vIndex){
        this.context = context;
        this.index = index;
        this.radius = Circle.MAX_RADIUS - index;
        this.isUp = isUp;
        this.hIndex = hIndex;
        this.vIndex = vIndex;
        this.drawCircle();
    }

    drawCircle(){
        this.context.beginPath();
        this.context.fillStyle = 'yellow';
        this.context.arc(MAX_RADIUS*this.hIndex, MAX_RADIUS*this.vIndex/2, this.radius, 0, 2*Math.PI);
        this.context.stroke();
    }
}

// export default Circle;