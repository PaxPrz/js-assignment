// import Column from './column.js';

class Helix{
    constructor(canvasId, rowCount, colCount, width, height){
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('id', canvasId);
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.border = "1px solid black";
        document.body.appendChild(this.canvas);

        this.context = this.canvas.getContext('2d');
        this.rowCount = rowCount;
        this.colCount = colCount;
        this.columns=[];
        
        this.drawColumns();
    }

    drawColumns(){
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.fillStyle = 'blue';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        for(var i=0; i<this.colCount; i++){
            this.columns.push(new Column())
        }
    }
}

var helix = new Helix('helixCanvas', 10, 15, 400, 400);