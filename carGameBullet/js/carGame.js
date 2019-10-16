var gameContainer = document.getElementById('game-container');

// var carImages = ['../images/cars/taxi.png', '../images/cars/Black_viper.png', '../images/cars/Mini_truck.png', '../images/cars/Ambulance.png'];
var carImages = ['https://www.github.com/PaxPrz/js-assignment/blob/gh-pages/carGame/images/cars/taxi.png?raw=true',
'https://www.github.com/PaxPrz/js-assignment/blob/gh-pages/carGame/images/cars/Black_viper.png?raw=true',
'https://www.github.com/PaxPrz/js-assignment/blob/gh-pages/carGame/images/cars/Mini_truck.png?raw=true',
'https://www.github.com/PaxPrz/js-assignment/blob/gh-pages/carGame/images/cars/Ambulance.png?raw=true'
]

for(var i=0; i<carImages.length; i++){
    img = new Image();
    img.src = carImages[i];
}

var leftLoc = ['80','200','320'];
var counter =0;
var SPEED = 5;
var highScore = 0;

var highScoreValue = document.getElementById('highscore');
var score = document.getElementById('score');

var MAX_BULLET=2;

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

class Bullet{
    constructor(lane){
        this.lane = lane;
        this.posY = 450;
        this.posX = leftLoc[this.lane]+50;
        this.drawBullet();
        this.moveBullet();
    }

    drawBullet(){
        this.bullet = document.createElement('h2');
        this.bullet.innerText = '^';
        this.bullet.style.width = '10px';
        this.bullet.style.height = '20px';
        this.bullet.style.position = 'absolute';
        this.bullet.style.left = this.posX+'px';
        this.bullet.style.top = this.posY+'px';
        this.bullet.style.backgroundColor = '#f00';
        this.bullet.style.zIndex=100;
        this.bullet.style.display= 'block';
        // this.bullet.style.borderRadius = '5px 5px 0px 0px';
        this.bullet.style.border = '1px solid black';
        gameContainer.appendChild(this.bullet);
    }

    moveBullet(){
        this.bulletMover = setInterval(()=>{
            this.posY -= 30;
            this.bullet.style.top = this.posY+'px';
        }, 10);
    }

    destroyBullet(){
        clearInterval(this.bulletMover);
        // console.log('bulletdestroy');
        gameContainer.removeChild(this.bullet);
    }
}


class CarGame{
    constructor(){
        this.gameOver = false;
        this.cars = [];
        this.bullets = [];
        this.singleBullet = null;
        this.backPos = 0;
        this.bulletCounter = MAX_BULLET;
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
        this.destroyBullet();

        this.checkHit();

        this.scoreupdater = setInterval(()=>{
            score.innerHTML = Math.floor(this.backPos);
            SPEED += 0.03;
        },100);

        this.createBulletBoard();

        this.bulletRespwaner = null;
        this.destroyBulletIndex = -1;

        document.addEventListener("keypress", (event)=>{
            var key = event.which || event.keyCode;
            if(key==97){
                this.moveLeft();
            }
            else if(key==100){
                this.moveRight();
            }
            else if(key==32){
                this.shootBullet();
            }
        });
    }

    createBulletBoard(){
        this.bulletBoard = document.createElement('h1');
        this.bulletBoard.style.position = 'absolute';
        this.bulletBoard.style.backgroundColor = '#777';
        this.bulletBoard.style.left = '400px';
        this.bulletBoard.style.top = '20px';
        this.bulletBoard.innerText = this.bulletCounter;
        gameContainer.appendChild(this.bulletBoard);
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
            var carIndex = -1;
            for(var i=0; i<this.cars.length; i++){
                for(var j=0; j<this.bullets.length; j++){
                    if(this.bullets[j].lane == this.cars[i].lane){
                        if(this.bullets[j].posY<this.cars[i].posY){
                            this.destroyBulletIndex = j;
                            carIndex = i;
                            break;
                        }
                    }
                }
                if(this.cars[i].posY>=500 || carIndex!=-1){
                    clearInterval(this.cars[i].move);
                    gameContainer.removeChild(this.cars[i].car);
                    this.cars.splice(i,1);
                    break;
                }
            }
        }, 20);
    }

    destroyBullet(){
        this.bulletDestroyer = setInterval(()=>{
            for(var i=0; i<this.bullets.length; i++){
                if(i==this.destroyBulletIndex){
                    this.destroyBulletIndex = -1;
                    this.bullets[i].destroyBullet();
                    this.bullets.splice(i,1);
                    break;
                }
                if(this.bullets[i].posY<=0){
                    this.bullets[i].destroyBullet();
                    this.bullets.splice(i,1);
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

    shootBullet(){
        if(this.gameOver == false && this.bulletCounter>0){
            console.log('shoot:', this.bulletCounter);
            this.bullets.push(new Bullet(this.mycar.lane));
            this.bulletCounter--;
            // if(this.bulletRespwaner==null){
            //     // this.bulletRespwaner = setInterval(()=>{
            //     //     this.bulletCounter++;
            //     //     this.bulletBoard.innerText = this.bulletCounter;
            //     //     if(this.bulletCounter>=0){
            //     //         clearInterval(this.bulletRespwaner);
            //     //         this.bulletRespwaner = null;
            //     //     }
            //     // }, 3000);
            // }
            setTimeout(()=>{
                this.bulletCounter++;
                this.bulletBoard.innerText = this.bulletCounter;
            }, 3000);
            this.bulletBoard.innerText = this.bulletCounter;
        }
    }

    checkHit(){
        this.hitCheck = setInterval(()=>{
            for(var i=0; i<this.cars.length; i++){
                if(this.cars[i].posY>=350){
                    // console.log('hit');
                    if(this.mycar.lane == this.cars[i].lane){
                        this.gameOver = true;
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
                        clearInterval(this.scoreupdater);
                        gameOver();
                    }
                }
            }
        }, 60);
    }

}

function gameOver(){
    console.log('GAMEOVER');
    over = document.createElement('div');
    over.style.width = '300px';
    over.style.height = '100px';
    over.style.position = 'absolute';
    over.style.left = '100px';
    over.style.top = '200px';
    over.style.backgroundColor = '#777';
    over.style.zIndex = 200;
    over.style.padding = '30px 30px';
    var h1 = document.createElement('h1');
    h1.innerText = 'GAMEOVER';
    h1.style.width = '300px';
    h1.style.textAlign = 'center';
    over.appendChild(h1);
    var btn = document.createElement('button');
    btn.innerHTML = 'Play Again';
    btn.style.marginLeft = '100px';
    btn.style.marginTop = '50px';
    btn.setAttribute('onclick', 'newGame()');
    over.appendChild(btn);
    gameContainer.appendChild(over);
}

function startGame(){
    document.body.removeChild(document.getElementById('startgame'));
    game = new CarGame();
}

function newGame(){
    clearTimeout(game.lane0ran);
    clearTimeout(game.lane1ran);
    clearTimeout(game.lane2ran);

    clearInterval(game.carDestroyer);
    clearInterval(game.bulletDestroyer);
    for(var i=0; i<game.cars.length; i++){
        gameContainer.removeChild(game.cars[i].car);
    }
    // delete(game);
    // console.log(game);
    gameContainer.removeChild(game.bulletBoard);
    gameContainer.removeChild(over);
    game = new CarGame();
}

