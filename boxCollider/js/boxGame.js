
var body = document.body;

class Shape{
    constructor(gameWidth, gameHeight, length){
        this.length = length;
        this.posX=Shape.getRandomInt(0, gameWidth-length);
        this.posY=Shape.getRandomInt(0, gameHeight-length);
        this.dx = Shape.getRandomFloat(-1, 1);
        this.dy = Shape.getRandomFloat(-1, 1);
        this.degree = 0;
        this.rotate = Shape.getRandomFloat(-1, 1)*2;
        this.create();
        this.update();
    }

    static getRandomInt(min, max){
        var min = Math.ceil(min);
        var max = Math.floor(max);
        return Math.floor(Math.random()*(max-min))+min;
    }

    static getRandomFloat(min, max){
        return (Math.random()*(max-min))+min;
    }

    create(){
        this.box = document.createElement('div');
        this.box.style.width = this.length+'px';
        this.box.style.height = this.length+'px';
        this.box.style.backgroundColor = '#f00';
        this.box.style.position = 'absolute';
        this.box.style.left = this.posX + 'px';
        this.box.style.top = this.posY + 'px';
        this.box.style.transform = `rotate(${this.degree}deg)`;
        // this.box.style.transformOrigin = '0 0';
        this.box.style.border = '1px solid black';
        body.appendChild(this.box);
    }

    move(){
        // console.log('moving');
        this.posX += Math.floor(this.dx*BoxGame.GAME_SPEED);
        this.posY += Math.floor(this.dy*BoxGame.GAME_SPEED);
        this.degree += this.rotate;
        this.box.style.left = this.posX+'px';
        this.box.style.top = this.posY+'px';
        this.box.style.transform = `rotate(${this.degree}deg)`;
    }

    update(){
        // this.updater = setInterval(function(){this.move()}.bind(this), 1000);
        this.updater = setInterval(()=>{
            this.move();
        }, 30);
    }
}

class Box extends Shape{
    constructor(gameWidth, gameHeight, length){
        super(gameWidth, gameHeight, length);
    }
}

class BoxGame{
    constructor(num, size){
        this.boxes=[];
        this.gameWidth = BoxGame.getGameWidth();
        this.gameHeight = BoxGame.getGameHeight();
        body.style.height = this.gameHeight;
        for(var i=0; i<num; i++){
            this.boxes.push(new Box(this.gameWidth, this.gameHeight, size));
        }
        this.collisionChecker = setInterval(()=>{
            this.checkCollision();
        }, 60);
        console.log('boxlength:', this.boxes.length);
        console.log('gameWidth', this.gameWidth);
        console.log('gameHeight', this.gameHeight);
    }

    static getGameWidth(){
        // return document.body.offsetWidth;
        return 500;
    }
    
    static getGameHeight(){
        // return document.body.offsetHeight;
        return 500;
    }

    checkCollision(){
        // console.log(this.boxes.length);
        for(var i=0; i<this.boxes.length; i++){
            let tanAngleValue = 0.292893*Math.tan(45-((45+this.boxes[i].degree)%45));
            let boxLeft = (this.boxes[i].posX - tanAngleValue);
            let boxRight = (this.boxes[i].posX + tanAngleValue + this.boxes[i].length);
            let boxTop = (this.boxes[i].posY - tanAngleValue);
            let boxBottom = (this.boxes[i].posY + tanAngleValue + this.boxes[i].length);

            if((boxLeft <= BoxGame.OFFSET && this.boxes[i].dx<0) || ((boxRight >= BoxGame.getGameWidth()-BoxGame.OFFSET) && this.boxes[i].dx>0)){
                this.boxes[i].dx = -this.boxes[i].dx;
            } 
            if((boxTop <= BoxGame.OFFSET && this.boxes[i].dy<0) || ((boxBottom >= BoxGame.getGameHeight()-BoxGame.OFFSET) && this.boxes[i].dy>0)){
                this.boxes[i].dy = -this.boxes[i].dy;
            }
    
            // if((this.boxes[i].posX-(Math.sin(this.boxes[i].degree*BoxGame.toDegree)*this.boxes[i].length)-BoxGame.OFFSET<=0 && this.boxes[i].dx<0) || (this.boxes[i].posX>=(BoxGame.getGameWidth()-(Math.cos(this.boxes[i].degree*BoxGame.toDegree)*this.boxes[i].length)-BoxGame.OFFSET) && this.boxes[i].dx>0)){
            //     this.boxes[i].dx = -this.boxes[i].dx;
            // }
            // if((this.boxes[i].posY-(Math.sin(this.boxes[i].degree*BoxGame.toDegree)*this.boxes[i].length)-BoxGame.OFFSET<=0 && this.boxes[i].dy<0) || (this.boxes[i].posY>=(BoxGame.getGameHeight()-(Math.cos(this.boxes[i].degree*BoxGame.toDegree)*this.boxes[i].length)-BoxGame.OFFSET) && this.boxes[i].dy>0)){
            //     this.boxes[i].dy = -this.boxes[i].dy;
            // }
            for(var j=i+1; j<this.boxes.length; j++){
                // console.log('i', i, 'j: ',j);
                // let tanInside = 0.292893*Math.tan(45-((45+this.boxes[j].degree)%45));
                // if(Math.abs(boxLeft-(this.boxes[j].posX - tanInside)) < this.boxes[j].length)

                if((Math.abs(this.boxes[i].posX-this.boxes[j].posX)<this.boxes[i].length*3) && (Math.abs(this.boxes[i].posY-this.boxes[j].posY)<this.boxes[i].length*3)){
                    // this.boxes[i].dx = -this.boxes[i].dx;
                    // this.boxes[i].dy = -this.boxes[i].dy;
                    // this.boxes[j].dx = -this.boxes[j].dx;
                    // this.boxes[j].dy = -this.boxes[j].dy;

                    let tempX = this.boxes[i].dx;
                    let tempY = this.boxes[i].dy;
                    this.boxes[i].dx = this.boxes[j].dx;
                    this.boxes[i].dy = this.boxes[j].dy;
                    this.boxes[j].dx = tempX;
                    this.boxes[j].dy = tempY;
                    this.boxes[i].posX += this.boxes[i].dx*5;
                    this.boxes[i].posY += this.boxes[i].dy*5;
                    this.boxes[j].posX += this.boxes[j].dx*5;
                    this.boxes[j].posY += this.boxes[j].dy*5;

                    // let rot = this.boxes[i].rotate;
                    // this.boxes[i].rotate = -this.boxes[j].rotate;
                    // this.boxes[j].rotate = -rot;

                    this.boxes[i].rotate = Box.getRandomFloat(-5,5);
                    this.boxes[j].rotate = Box.getRandomFloat(-5,5);
                }
            }
        }
    }
}
BoxGame.GAME_SPEED = 5;
BoxGame.OFFSET = 20;
BoxGame.toDegree = Math.PI/180;

var game = new BoxGame(10, 10);