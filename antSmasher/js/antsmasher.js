var body = document.body;

class Ant{
    constructor(gameWidth, gameHeight, length){
        this.length = length;
        this.posX=Ant.getRandomInt(0, gameWidth-length);
        this.posY=Ant.getRandomInt(0, gameHeight-length);
        this.dx = Ant.getRandomFloat(-1, 1);
        this.dy = Ant.getRandomFloat(-1, 1);
        this.degree = 0;
        // this.rotate = Shape.getRandomFloat(-1, 1)*2;
        this.create();
        console.log('done');
        // this.update();
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

var ant = new Ant(800, 500, 100);