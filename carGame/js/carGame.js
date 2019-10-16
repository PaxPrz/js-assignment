var gameContainer = document.getElementById('game-container');

var carImages = ['../images/cars/taxi.png', '../images/cars/Black_viper.png', '../images/cars/Mini_truck.png', '../images/cars/Ambulance.png'];
var leftLoc = ['80','200','320'];
var counter =0;
var SPEED = 5;
var highScore = 0;

var highScoreValue = document.getElementById('highscore');

class Car{
    constructor(lane, direction=-1){
        this.posX = leftLoc[lane];
        this.posY = -100;
        this.lane = lane;
        this.direction = direction;
        this.drawCar();
        if(direction!=0){
            this.moveCar();
        }
    }

    static randomInt(min, max){
        var min = Math.ceil(min);
        var max = Math.floor(max);
        return Math.floor(Math.random()*(max-min))+min;
    }

    drawCar(){
        this.car = new Image();
        this.car.src = (this.direction==0) ? carImages[0] : carImages[Car.randomInt(1,carImages.length)];
        this.car.style.width = '100px';
        this.car.style.height = '100px';
        this.car.style.left = (this.direction==0) ? leftLoc[1]+'px' : leftLoc[this.lane]+'px';
        this.car.style.top = (this.direction==0) ? 450+'px' : -100+'px';
        if(this.direction!=0){
            this.car.style.transform = 'rotate(180deg)';
        }
        this.car.style.position = 'absolute';
        counter++;
        gameContainer.appendChild(this.car);
    }

    moveCar(){
        this.move=setInterval(()=>{
            this.posY -= Math.floor(SPEED*this.direction);
            this.car.style.top = this.posY +'px';
        },30);
    }

}


class CarGame{
    constructor(){
        this.gameOver = false;
        this.cars = [];
        this.backPos = 0;
        gameContainer.style.backgroundPositionY = '0px';
        this.backgroundMover = setInterval(()=>{
            this.backPos += SPEED;
            gameContainer.style.backgroundPositionY = this.backPos+'px';
        }, 30);

        this.mycar = new Car(1, 0);

        this.lane0();
        this.lane1();
        this.lane2();
        this.destroyCars();

        this.checkHit();
    }

    lane0(){
        this.lane0ran = setTimeout(()=>{
            this.cars.push(new Car(0, -1.5))
            this.lane0();
        }, Car.randomInt(2000,4000));
    }
    
    lane1(){
        this.lane1ran = setTimeout(()=>{
            this.cars.push(new Car(1, -2))
            this.lane1();
        }, Car.randomInt(3000,6000));
    }
    
    lane2(){
        this.lane2ran = setTimeout(()=>{
            this.cars.push(new Car(2, -3))
            this.lane2();
        }, Car.randomInt(2000,8000));
    }

    destroyCars(){
        this.carDestroyer = setInterval(()=>{
            for(var i=0; i<this.cars.length; i++){
                if(this.cars[i].posY>=500){
                    clearInterval(this.cars[i].move);
                    gameContainer.removeChild(this.cars[i].car);
                    this.cars.splice(i,1);
                    break;
                }
            }
        }, 100);
    }

    moveLeft(){
        this.mycar.lane = (this.mycar.lane<=0) ? 0: this.mycar.lane-1;
        this.mycar.posX = leftLoc[this.mycar.lane];
        this.mycar.car.style.left = this.mycar.posX+'px';
    }

    moveRight(){
        this.mycar.lane = (this.mycar.lane>=2) ? 2: this.mycar.lane+1;
        this.mycar.posX = leftLoc[this.mycar.lane];
        this.mycar.car.style.left = this.mycar.posX+'px';
    }

    checkHit(){
        this.hitCheck = setInterval(()=>{
            for(var i=0; i<this.cars.length; i++){
                if(this.cars[i].posY>=350){
                    console.log('hit');
                    if(this.mycar.lane == this.cars[i].lane){
                        clearInterval(this.backgroundMover);
                        clearInterval(this.lane0run);
                        clearInterval(this.lane1run);
                        clearInterval(this.lane2run);
                        clearInterval(this.hitCheck);
                        gameContainer.removeChild(this.mycar.car);
                        SPEED = 5;
                        if(highScore<Math.floor(game.backPos)){
                            highScore = Math.floor(game.backPos);
                            highScoreValue.innerHTML = highScore;
                        }
                        clearInterval(scoreupdater);
                    }
                }
            }
        }, 60);
    }


}

var game = new CarGame();

document.addEventListener("keypress", (event)=>{
    var key = event.which || event.keyCode;
    if(key==97){
        game.moveLeft();
    }
    else if(key==100){
        game.moveRight();
    }
});

var score = document.getElementById('score');
var scoreupdater = setInterval(()=>{
    score.innerHTML = Math.floor(game.backPos);
    SPEED += 0.03;
},100);
