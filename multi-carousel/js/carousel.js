
function carousel(timer){

    this.container = null;
    this.wrapper = null;
    this.images = null;
    this.imageCount = null;
    this.imageWidth = null;
    this.currentIndex = 0;
    this.dots = null;
    this.timer = timer;
    this.leftsign = null;
    this.rightsign = null;

    this.FPS=60;
    this.FRAME_LIMIT = 1000/this.FPS;

    this.moving = false;

    this.createButton = function(left){
        var sign = document.createElement('button');
        sign.innerHTML = left ? '&lt;': '&gt;';
        sign.style.position = 'relative';
        sign.style.zIndex = '100';
        sign.style.top = '-100px';
        sign.style.marginLeft = left ? '5%': '82%';
        sign.style.color = '#555';
        sign.style.background = 'none';
        sign.style.border = 'none';
        sign.style.fontSize = '44px';
        sign.style.textDecoration = 'none';
        sign.setAttribute('id', carouselCounter);
        var move = left ? 'move(16, this.id);' : 'move(-16, this.id);';
        sign.setAttribute('onclick', move);
        return sign;
    }

    this.createPoints = function(){
        var stars = document.createElement('ul');
        for(var i=0; i<this.imageCount; i++){
            var li = document.createElement('li');
            var btn = document.createElement('button');
            btn.innerHTML = 'o';
            btn.style.fontSize = '20px';
            btn.style.border = 'none';
            btn.style.background = 'none';
            btn.style.opacity = '1';
            btn.style.color = '#afa';
            btn.setAttribute('id', carouselCounter);
            btn.setAttribute('onclick', `jumpTo(${i}, this.id);`);
            if(i==0){
                btn.className += 'activeStar';
            }
            li.appendChild(btn);
            li.style.cssFloat = 'left';
            li.style.listStyle = 'none';
            li.style.padding = '3px 10px';
            li.style.backgroundColor = '#000';
            li.style.opacity = '0.5';
            stars.appendChild(li);
        }
        stars.style.marginLeft = '40%';
        stars.style.position = 'relative';
        stars.style.top = '-100px';
        stars.style.zIndex = '100';
        return stars;
    }

    this.init = function(container, wrapper){
        this.container = container; // document.getElementById('container');
        this.wrapper = wrapper; //document.getElementById('carousel');
        this.images = this.wrapper.children;
        this.imageCount = this.images.length;
        this.imageWidth = this.images[0].naturalWidth;
        this.currentIndex = 0;

        this.wrapper.style.width = this.imageWidth*this.images.length+'px';
        this.wrapper.style.left = '0px';

        this.leftsign = this.createButton(true);
        this.rightsign = this.createButton(false);
        
        this.container.appendChild(this.leftsign);
        this.container.appendChild(this.rightsign);

        this.dots = this.createPoints();
        this.container.appendChild(this.dots);

        console.log('done');
        return this;
    }

    this.move = function(move_factor){
        if(this.moving==false){
            if(this.currentIndex==0 && move_factor>0){
                this.jumpTo(this.imageCount-1);
                return;
            }
            if(this.currentIndex==(this.imageCount-1) && move_factor<0){
                this.jumpTo(0);
                return;
            }
            
            this.moving = true;
            this.autoSlide();
            // console.log(images);
            // console.log(dots.children[currentIndex].children[0]);
            this.dots.children[this.currentIndex].children[0].className = '';
            var last_pos = parseInt(this.wrapper.style.left);
            var current_pos = parseInt(this.wrapper.style.left);
            var movement = setInterval((e)=>{
                current_pos = current_pos + move_factor;
                this.wrapper.style.left = current_pos+'px';
                var testValue = this.imageWidth-Math.abs(current_pos-last_pos);
                if(testValue<=Math.abs(move_factor)){
                    this.wrapper.style.left = (current_pos + ((move_factor>0)? testValue: -testValue))+'px';
                    this.moving=false;
                    clearInterval(movement);
                }
            }, this.FRAME_LIMIT);
            if(move_factor < 0){
                this.currentIndex += 1;
            }else{
                this.currentIndex -= 1;
            }
            this.dots.children[this.currentIndex].children[0].className = 'activeStar';
            
        }
        console.log('currentIndex : ', this.currentIndex);
    }

    this.jumpTo = function(index){
        if(this.currentIndex == index){
            return;
        }
        if(this.moving==false){
            this.moving = true;
            this.autoSlide();
            this.dots.children[this.currentIndex].children[0].className = '';
            var last_pos = parseInt(this.wrapper.style.left);
            var current_pos = parseInt(this.wrapper.style.left);
            var factor = this.currentIndex - index;
            var destination_pos = factor*this.imageWidth;
            var f = (factor<0) ? -1 : 1;
            var move_factor = 64*f;
            var movement = setInterval((e)=>{
                current_pos = current_pos + move_factor;
                this.wrapper.style.left = current_pos+'px';
                var testValue = Math.abs(destination_pos)-Math.abs(current_pos-last_pos);
                if(testValue<=Math.abs(move_factor)){
                    this.wrapper.style.left = (current_pos + ((move_factor>0)? testValue: -testValue))+'px';
                    this.moving=false;
                    clearInterval(movement);
                }
            }, this.FRAME_LIMIT);
            this.currentIndex = index;
            this.dots.children[this.currentIndex].children[0].className = 'activeStar';
        }
        console.log('currentIndex : ', this.currentIndex);
    }

    this.autoMove = setInterval((e)=>{
        this.move(-8);
    },timer);

    this.autoSlide = function(){
        clearInterval(this.autoMove);
        this.autoMove = setInterval((e)=>{
            this.move(-8);
        },timer);
    }

    this.checkAlignment = function(){
        if(this.moving==true){
            setTimeout(()=>{
                this.wrapper.style.left = -(this.currentIndex*this.imageWidth);
            }, 2000);
        }
        else{
            this.wrapper.style.left = -(this.currentIndex*this.imageWidth);
        }
    }


}

var carouselCounter =0;
var BASE_WIDTH = 300;
var screenWidth = window.screen.width;
var containerWidths= [];
var timers=[4000,5000,6000,7000];
var carouselObjects = [];

var containers = document.querySelectorAll('.container');
var wrappers = document.querySelectorAll('.wrapper');


for(var i=0; i<wrappers.length; i++){
    var obj = new carousel(timers[i]).init(containers[i], wrappers[i]);
    carouselObjects.push(obj);
    carouselCounter++;
}

function getWidthOfContainers(){
    for(var i=0; i<carouselObjects.length; i++){
        containerWidths.push(containers[i].style.width);
    }
    console.log(containerWidths);
}

function resizeEverything(){
    var size = document.body.offsetWidth;
    var ratio = size/screenWidth;
    console.log('container[0]: ', parseInt(containerWidths[0]));
    console.log('screenWidth: ', screenWidth);
    console.log('size: ', size);
    console.log('ratio: ', ratio);
    for(var i=0; i<carouselObjects.length; i++){
        var currWidth = parseInt(ratio*parseInt(containerWidths[i]));
        // console.log('currWidth', i, ': ', currWidth);
        containers[i].style.width = currWidth + 'px';
        for(var j=0; j<carouselObjects[i].imageCount; j++){
            carouselObjects[i].images[j].width = currWidth;
            carouselObjects[i].imageWidth = currWidth;
        }
        carouselObjects[i].leftsign.style.fontSize = currWidth/10 +'px';
        carouselObjects[i].leftsign.style.marginLeft = currWidth/100 +'px';
        carouselObjects[i].leftsign.style.top = -currWidth/4 +'px';

        carouselObjects[i].rightsign.style.fontSize = currWidth/10 +'px';
        carouselObjects[i].rightsign.style.marginLeft = currWidth*0.80 +'px';
        carouselObjects[i].rightsign.style.top = -currWidth/4 +'px';
        
        carouselObjects[i].dots.style.top = -(currWidth/5) +'px';
        carouselObjects[i].dots.style.marginLeft = (currWidth/2)-(carouselObjects[i].dots.children.length*15) +'px';
        
    }
}

var resizeId;
window.addEventListener('resize', function(){
    console.log('Window resized');
    this.clearTimeout(resizeId);
    // resizeId = setTimeout(doneResizing, 500);
    resizeId = setTimeout(refreshWindow, 200);
});
function refreshWindow(){
    location.reload();
}
function doneResizing(){
    resizeEverything();
    // for(var i=0; i<carouselObjects.length; i++){
    //     // carouselObjects[i].checkAlignment();

    //     new Promise(function(resolve = ()=>{
    //         console.log("PROMISE SUCCESS");
    //         wrappers[i].style.left = -(carouselObjects[i].currentIndex*carouselObjects[i].imageWidth);
    //     }, reject = ()=>{
    //         console.log("PROMISE ERROR");
    //     }){
    //         var myInterval = setInterval(()=>{
    //             if(carouselObjects[i].moving==false){
    //                 clearInterval(myInterval);
    //                 // setTimeout(()=>{}, 500);
    //                 resolve();
    //             }
    //         },500);
    //     });

    //     // if(carouselObjects[i].moving == true){
    //     //     var obj = carouselObjects[i];
    //     //     var wrap = wrappers[i];
    //     //     setTimeout(function(){
    //     //         console.log('timeout');
    //     //         wrap.style.left = -(obj.currentIndex*obj.imageWidth);
    //     //     },3000);
    //     // }

    //     // var myIntv = setInterval(function(){
    //     //     if(obj.moving==false){
    //     //         console.log(wrap);
    //     //         wrap.style.left = -(obj.currentIndex*obj.imageWidth);
    //     //         clearInterval(myIntv);
    //     //     }
    //     // }, 200);
    // }
}

// document.body.setAttribute('onresize', 'resizeEverything();');

getWidthOfContainers();
resizeEverything();

function move(value, index){
    console.log('index : ',index);
    carouselObjects[index].move(value);
}

function jumpTo(value, index){
    carouselObjects[index].jumpTo(value);
}
