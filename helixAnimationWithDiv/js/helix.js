class Circle{
    static MAX_RADIUS = 20;

    constructor(hIndex){
        this.hIndex = hIndex;
        this.radius = Circle.MAX_RADIUS - this.hIndex;
        this.drawCircle();
    }

    drawCircle(){
        this.circle = document.createElement('div');
        this.circle.style.width = this.radius+'px';
        this.circle.style.height = this.radius+'px';
        this.circle.style.borderRadius = '50%';
        this.circle.style.position = 'relative';
        this.circle.style.top = Circle.MAX_RADIUS/2 +'px';
    }    
}

class Column{
    
}