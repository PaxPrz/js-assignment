(function(){
  
    function getRandomInt(min, max){
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() *(max-min))+min;
    }
    
    function Box(parentElem){
      this.parentElem = parentElem;
      this.element = null;
      this.x = null;
      this.y = null;
      this.dx = 1;
      this.dy = 1;
      
      this.setPosition= function(ranX, ranY){
        this.x = ranX;
        this.y = ranY;
      }
      
      this.init = function(){
        this.element = document.createElement('div');
        this.element.classList.add('box');
        this.parentElem.appendChild(this.element);
      }
      
      this.init();
      
      this.draw = function(x,y){
        this.element.style.top = this.y + 'px';
        this.element.style.left = this.x + 'px';
      }
      
      this.move = move.bind(this);
      
      function move(){
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
      
    }
    
    function Game(boxCount){
      var GAME_WIDTH = 500;
      var GAME_HEIGHT = 500;
      var GAME_ANIMATION_FRAME = 24;
      this.boxes = [];
      this.boxCount = boxCount;
      this.parentElem = document.getElementById('app');
      
      
      this.createBoxes = function(){
        for(var i=0; i< this.boxCount; i++){
          var box = new Box(this.parentElem);
          var randomX = getRandomInt(0, GAME_WIDTH);
          var randomY = getRandomInt(0, GAME_HEIGHT);
          console.log('Random: ', randomX, randomY);
          box.setPosition(randomX, randomY);
          box.draw();
          this.boxes.push(box);
        }
      }
      
      this.init = function(){
        this.createBoxes();
        setInterval(this.moveBoxes.bind(this), GAME_ANIMATION_FRAME);
  //       this.boxCount = boxCount;
        return this;
      }
      
      this.moveBoxes = function(){
        for(var i=0; i<this.boxCount; i++){
          boxes[i].move();
        }
      }
    }
    
  //   new Game(10).init();
    
  })();
  