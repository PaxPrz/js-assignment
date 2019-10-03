
var FPS=60;
var FRAME_LIMIT = 1000/FPS;

var moving = false;
var MOVE_FACTOR = 2;
var imageWidth = 1024;

function createButton(left){
    var sign = document.createElement('button');
    sign.innerHTML = left ? '&lt;': '&gt;';
    sign.style.position = 'relative';
    sign.style.zIndex = '100';
    sign.style.top = '-240px';
    sign.style.marginLeft = left ? '5%': '82%';
    sign.style.color = '#555';
    sign.style.background = 'none';
    sign.style.border = 'none';
    sign.style.fontSize = '44px';
    sign.style.textDecoration = 'none';
    var move = left ? 'move(64);' : 'move(-64);';
    sign.setAttribute('onclick', move);
    return sign;
}

function createPoints(){
    var stars = document.createElement('ul');
    for(var i=0; i<imageCount; i++){
        var li = document.createElement('li');
        var btn = document.createElement('button');
        btn.innerHTML = 'o';
        btn.style.fontSize = '30px';
        btn.style.border = 'none';
        btn.style.background = 'none';
        btn.style.opacity = '1';
        btn.style.color = '#afa';
        btn.setAttribute('onclick', `jumpTo(${i});`);
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
    // stars.style.textAlign = 'center';
    stars.style.marginLeft = '40%';
    stars.style.position = 'relative';
    stars.style.top = '-100px';
    stars.style.zIndex = '100';
    // stars.style.display = 'block';
    // stars.style.border = '5px solid black'
    // stars.style.backgroundColor = '#aaa';
    // stars.style.opacity = '0.9';
    return stars;
}

function createCarousal(){
    container = document.getElementById('container');
    wrapper = document.getElementById('carousel');
    images = wrapper.children;
    imageCount = images.length;
    imageWidth = images[0].naturalWidth;
    currentIndex = 0;
    container.style.width = imageWidth+'px';
    wrapper.style.width = imageWidth*images.length+'px';
    wrapper.style.left = '0px';

    leftsign = createButton(true);
    rightsign = createButton(false);
    
    container.appendChild(leftsign);
    container.appendChild(rightsign);

    dots = createPoints();
    container.appendChild(dots);

    console.log('done');
}

createCarousal();

function move(move_factor){
    if(moving==false){
        if(currentIndex==0 && move_factor>0){
            jumpTo(imageCount-1);
            return;
        }
        if(currentIndex==(imageCount-1) && move_factor<0){
            jumpTo(0);
            return;
        }
        
        moving = true;
        autoSlide();
        // console.log(images);
        // console.log(dots.children[currentIndex].children[0]);
        dots.children[currentIndex].children[0].className = '';
        var last_pos = parseInt(wrapper.style.left);
        var current_pos = parseInt(wrapper.style.left);
        var movement = setInterval((e)=>{
            current_pos = current_pos + move_factor;
            wrapper.style.left = current_pos+'px';
            if(Math.abs(current_pos-last_pos) >= imageWidth){
                moving=false;
                clearInterval(movement);
            }
        }, FRAME_LIMIT);
        if(move_factor < 0){
            currentIndex += 1;
        }else{
            currentIndex -= 1;
        }
        dots.children[currentIndex].children[0].className = 'activeStar';
        
    }
    console.log('currentIndex : ', currentIndex);
}

function jumpTo(index){
    if(currentIndex == index){
        return;
    }
    if(moving==false){
        moving = true;
        autoSlide();
        dots.children[currentIndex].children[0].className = '';
        var last_pos = parseInt(wrapper.style.left);
        var current_pos = parseInt(wrapper.style.left);
        var factor = currentIndex - index;
        var destination_pos = factor*imageWidth;
        var f = (factor<0) ? -1 : 1;
        var movement = setInterval((e)=>{
            current_pos = current_pos + 256*f;
            wrapper.style.left = current_pos+'px';
            if(Math.abs(current_pos-last_pos) >= Math.abs(destination_pos)){
                moving=false;
                clearInterval(movement);
            }
        }, FRAME_LIMIT);
        currentIndex = index;
        dots.children[currentIndex].children[0].className = 'activeStar';
    }
    console.log('currentIndex : ', currentIndex);
}

function autoSlide(){
    clearInterval(autoMove);
    autoMove = setInterval((e)=>{
        move(-16);
    },5000);
}

autoMove = setInterval((e)=>{
    move(-16);
},5000);