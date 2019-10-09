var body = document.body;

class Ant{
    constructor(gameWidth, gameHeight, length=30){
        this.length = length;
        this.posX=Ant.getRandomInt(0, gameWidth-length);
        this.posY=Ant.getRandomInt(0, gameHeight-length);
        this.dx = Ant.getRandomFloat(-1, 1);
        this.dy = Ant.getRandomFloat(-1, 1);
        this.isKilled = false;
        this.directionInterval = null;
        this.degree = Math.atan(this.dy/this.dx)*180/Math.PI -90;
        // this.rotate = Shape.getRandomFloat(-1, 1)*2;
        this.create();
        // console.log('done');
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
        this.box = document.createElement('img');
        this.box.style.width = this.length+'px';
        this.box.style.height = this.length+'px';
        this.box.src = '../images/ant.gif';
        // this.box.style.backgroundImage = '../images/ant.gif';
        this.box.style.position = 'absolute';
        this.box.style.left = this.posX + 'px';
        this.box.style.top = this.posY + 'px';
        this.box.style.transform = `rotate(${this.degree}deg)`;
        this.box.onclick = function(){
            console.log('clicked');
            this.stopIt();
        }.bind(this);
        // this.box.style.transformOrigin = '0 0';
        // this.box.style.border = '1px solid black';
        body.appendChild(this.box);
    }

    move(){
        // console.log('moving');
        this.posX += Math.floor(this.dx*AntGame.GAME_SPEED);
        this.posY += Math.floor(this.dy*AntGame.GAME_SPEED);
        // this.degree += this.rotate;
        this.box.style.left = this.posX+'px';
        this.box.style.top = this.posY+'px';
        this.box.style.transform = `rotate(${this.degree}deg)`;
    }

    update(){
        // this.updater = setInterval(function(){this.move()}.bind(this), 1000);
        this.updater = setInterval(()=>{
            this.move();
        }, 30);

        this.changeDirection = setInterval(()=>{
            if(this.directionInterval!=null){
                clearInterval(this.directionInterval);
            }
            if(this.posX>=100 && this.posX<=AntGame.getGameWidth()-100 && this.posY>=100 && this.posY<=AntGame.getGameHeight()-100){
                if(Ant.getRandomInt(0,5)<2){
                    let turn = this.dx>this.dy;
                    let force = Math.sqrt((this.dx*this.dx)+(this.dy*this.dy));
                    // console.log('changing direction');
                    this.directionInterval = setInterval(()=>{
                        if(turn){
                            this.degree += 4;
                        }
                        else{
                            this.degree -= 4;
                        }
                        // this.degree = Math.atan(this.dy/this.dx)*180/Math.PI -90;
                        this.dx = force*Math.cos((this.degree+90)*Math.PI/180);
                        this.dy = force*Math.sin((this.degree+90)*Math.PI/180);
                    }, 30);
                }
            }
        },1000);
    }

    stopIt(){
        clearInterval(this.updater);
        clearInterval(this.changeDirection);
        this.box.src = '../images/antkilled.png';
    }
}

class AntGame{
    constructor(num){
        this.ants=[];
        this.gameWidth = AntGame.getGameWidth();
        this.gameHeight = AntGame.getGameHeight();
        for(var i=0; i<num; i++){
            this.ants.push(new Ant(this.gameWidth, this.gameHeight));
        }
        this.collisionChecker = setInterval(()=>{
            this.checkCollision();
        }, 60);
    }

    static getGameWidth(){
        return 800;
    }

    static getGameHeight(){
        return 500;
    }

    checkCollision(){
        for(var i=0; i<this.ants.length; i++){
            // let tanAngleValue = 0.292893*Math.tan(45-((45+this.boxes[i].degree)%45));
            // let boxLeft = (this.boxes[i].posX - tanAngleValue);
            // let boxRight = (this.boxes[i].posX + tanAngleValue + this.boxes[i].length);
            // let boxTop = (this.boxes[i].posY - tanAngleValue);
            // let boxBottom = (this.boxes[i].posY + tanAngleValue + this.boxes[i].length);

            if((this.ants[i].posX <= AntGame.OFFSET && this.ants[i].dx<0) || ((this.ants[i].posX >= AntGame.getGameWidth()-AntGame.OFFSET) && this.ants[i].dx>0)){
                this.ants[i].dx = -this.ants[i].dx;
                this.ants[i].degree = -this.ants[i].degree;
            } 
            if((this.ants[i].posY <= AntGame.OFFSET && this.ants[i].dy<0) || ((this.ants[i].posY >= AntGame.getGameHeight()-AntGame.OFFSET) && this.ants[i].dy>0)){
                this.ants[i].dy = -this.ants[i].dy;
                this.ants[i].degree = -this.ants[i].degree;
            }

            for(var j=i+1; j<this.ants.length; j++){
                if((Math.abs(this.ants[i].posX-this.ants[j].posX)<this.ants[i].length) && (Math.abs(this.ants[i].posY-this.ants[j].posY)<this.ants[i].length)){
                    let tempX = this.ants[i].dx;
                    let tempY = this.ants[i].dy;
                    this.ants[i].dx = this.ants[j].dx;
                    this.ants[i].dy = this.ants[j].dy;
                    this.ants[j].dx = tempX;
                    this.ants[j].dy = tempY;
                    this.ants[i].posX += this.ants[i].dx*5;
                    this.ants[i].posY += this.ants[i].dy*5;
                    this.ants[j].posX += this.ants[j].dx*5;
                    this.ants[j].posY += this.ants[j].dy*5;
                   
                    this.ants[i].degree = Math.atan(this.ants[i].dy/this.ants[i].dx)*180/Math.PI -90;
                    this.ants[j].degree = Math.atan(this.ants[j].dy/this.ants[j].dx)*180/Math.PI -90;
                }
            }
        }
    }
}

AntGame.OFFSET = 20;
AntGame.GAME_SPEED = 4;

var game = new AntGame(10);

// var ant = new Ant(800, 500, 30);