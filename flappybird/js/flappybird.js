var gameContainer = document.getElementById('game-container');
var bird = document.getElementById('bird');
var platform = document.getElementById('platformImg');
var pipe1 = document.getElementById('pipe1');
var pipe2 = document.getElementById('pipe2');
var homeScreen = document.getElementById('homeScreen');
var scoreId = document.getElementById('score');
var highscoreId = document.getElementById('highscore');
var scoreVal = document.getElementById('scoreVal');
var scoreboard = document.getElementById('scoreboard');
var HighScore = 0;

function newGame(){
    var score = 0;
    var scoreTimeout = false;
    var birdTop = 300;
    bird.style.top = birdTop+'px';
    bird.style.backgroundPositionY='0px';
    var birdFlyIndex = 0;
    var GAMEOVER = false;
    homeScreen.style.display = 'none';
    scoreboard.style.display = 'block';
    scoreVal.innerText = '0';

    var birdFly = setInterval(()=>{
        birdFlyIndex = (birdFlyIndex+1)%3;
        bird.style.backgroundPositionY = 25*birdFlyIndex+'px';
    }, 200);

    platform.style.backgroundPositionX='0px';

    function gameOver(){
        GAMEOVER = true;
        clearInterval(platformRun);
        clearInterval(fall);
        clearInterval(pipeRun);
        clearInterval(birdFly);
        if(score>HighScore){
            HighScore = score;
        }
        scoreId.innerHTML = score;
        highscoreId.innerHTML = HighScore;
        setTimeout(()=>{
            scoreboard.style.display = 'none';
            homeScreen.style.display = 'block';
        },1000);

    }

    function collisionDetection(){
        function scoreIncreaser(){
            if(!scoreTimeout){
                scoreTimeout = setTimeout(()=>{
                    if(!GAMEOVER){
                        score++;
                    }
                    scoreVal.innerHTML = score;
                    scoreTimeout=false;
                },500);
            }
        }
        if(birdTop>=475){
            gameOver();
        }
        if(pipe1left>=60 && pipe1left<=130){
            scoreIncreaser();
            if(birdTop<=pipe1top+400 || birdTop >= pipe1top+480){
                if(scoreTimeout!=false){clearTimeout(scoreTimeout);}
                gameOver();
            }
        }
        if(pipe2left>=60 && pipe2left<=130){
            scoreIncreaser();
            if(birdTop<=pipe2top+400 || birdTop >= pipe2top+480){
                if(!scoreTimeout){clearTimeout(scoreTimeout);}
                gameOver();
            }
        }
    }

    var backPos=0;
    var platformRun = setInterval(()=>{
        backPos-=5;
        platform.style.backgroundPositionX = backPos+'px';
        collisionDetection();
    }, 30);

    function randomInt(min, max){
        return Math.floor(Math.random()*(max-min))+min;
    }

    var pipe1left = 400;
    var pipe2left = 626;
    var pipe1top = randomInt(-300, -100);
    var pipe2top = randomInt(-300, -100);
    var pipeRun = false;

    function start(){
        pipe1.style.left = pipe1left+'px';
        pipe2.style.left = pipe2left+'px';
        pipe1.style.top = pipe1top+'px';
        pipe2.style.top = pipe2top+'px';
        pipeRun = setInterval(()=>{
            pipe1left -=5;
            pipe2left -=5;
            pipe1.style.left = pipe1left+'px';
            pipe2.style.left = pipe2left+'px';
            if(pipe1left<=-52){
                pipe1left = 400;
                pipe1.style.left = pipe1left+'px';
                pipe1top =randomInt(-300, -100);
                pipe1.style.top = pipe1top+'px';
            }
            if(pipe2left<=-52){
                pipe2left = 400;
                pipe2.style.left = pipe2left+'px';
                pipe2top =randomInt(-300, -100);
                pipe2.style.top = pipe2top+'px';
            }
        }, 30);
    }

    var jumpLen = 0;
    var jumpInterval = false;

    function jump(){
        jumpLen=6;
        if(!jumpInterval){
            jumpInterval = setInterval(()=>{
                if(GAMEOVER){
                    clearInterval(jumpInterval);
                }
                jumpLen-=1;
                birdTop-=5*jumpLen ;  
                bird.style.top = birdTop+'px';
                if(jumpLen<=0){
                    clearInterval(jumpInterval);
                    jumpInterval = false;
                }
            }, 20);
        }
    }

    var fall = setInterval(()=>{
        birdTop += 5;
        bird.style.top = birdTop+'px'; 
    }, 30);

    document.addEventListener("keypress", (event)=>{
        var key = event.which || event.keyCode;
        if(key==32){
            if(!GAMEOVER){
                jump();
            }
        }
    });

    document.addEventListener("click", (event)=>{
        if(!GAMEOVER){
            jump();
        }
    })

    start();
}
