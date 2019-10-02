/**
 * Assignment "Objects"
 */
var fruits = [
    {id: 1, name: 'Banana', color: 'Yellow'},
    {id: 2, name: 'Apple', color: 'Red'}
]

function searchByName(fruits, value){
    var arraylist=[];
    for(var i=0; i<fruits.length; i++){
        var values = Object.values(fruits[i]);
        for(var j=0; j<values.length; j++){
            if(values[j].toString().toLowerCase() === value.toString().toLowerCase()){
                arraylist.push(fruits[i]);
                break;
            }
        }
    }
    return arraylist;
}

function searchByKey(fruits, key, value){
    var arraylist=[];
    for(var i=0; i<fruits.length; i++){
        if(fruits[i][key].toString().toLowerCase() === value.toString().toLowerCase()){
            arraylist.push(fruits[i]);
        }
    }
    return arraylist;
}

/**
 * Functions
 */
var numbers=[1,2,3,4];

function transform(collection, transFunc){
    for(var i=0; i<collection.length; i++){
        collection[i]=transFunc(collection[i]);
    }
    return collection;
}

var output = transform(numbers, function(num){
    return num*2;
});

/**
 * Sorting
 */
var arr = [{
    id: 1,
    name: 'John',
}, {
    id: 2,
    name: 'Mary',
}, {
    id: 3,
    name: 'Andrew',
}];

function sortBy(array, key){
    //Bubble sort
    for(var i=0; i<array.length-1; i++){
        for(var j=i+1; j<array.length; j++){
            if(array[i][key]>array[j][key]){
                temp = array[i];
                array[i]=array[j];
                array[j]=temp;
            }
        }
    }
}

/**
 * Normalization
 */
var input = {
    '1': {
      id: 1,
      name: 'John',
      children: [
        { id: 2, name: 'Sally' },
        { id: 3, name: 'Mark', children: [{ id: 4, name: 'Harry' }] }
      ]
    },
    '5': {
      id: 5,
      name: 'Mike',
      children: [{ id: 6, name: 'Peter' }]
    }
};

function Normalize(input){
    output={};

    function normalize(inp){
        if(inp.hasOwnProperty('children')){
            for(var j=0; j<inp.children.length; j++){
            normalize(inp.children[j]);
            inp.children[j]= inp.children[j].id;
            }
        }
        output[inp.id.toString()] = inp;
    }

    var keys = Object.keys(input);
    for(var i=0; i<keys.length; i++){
        normalize(input[keys[i]]);
    }
    return output;
}

/**
 * Plot Points
 */
var points = [
    {x: 10, y: 20},
    {x: 40, y: 40},
    {x: 60, y: 20}
];

function scatterPlot(points){ 
    function plot(x, y){
        var point = document.createElement('div');
        point.style.width = '4px';
        point.style.height = '4px';
        point.style.position = 'absolute';
        point.style.left = x+'px';
        point.style.top = y+'px';
        point.style.borderRadius = '50%';
        point.style.backgroundColor = '#f00';
        document.body.appendChild(point);
    }
    for(var i=0; i<points.length; i++){
        plot(points[i].x, points[i].y);
    }
}

/**
 * Animations
 */
var FPS=240;
var FRAME_LIMIT = 1000/FPS;

function createBall(){
    var ball = document.createElement('div');
    ball.setAttribute('id', 'ball');
    ball.style.width = 50+'px';
    ball.style.height = 50+'px';
    ball.style.position = 'absolute';
    ball.style.top = '0px';
    ball.style.borderRadius='50%';
    ball.style.backgroundColor = '#00f';
    ball.style.marginTop = '15px';
    ball.style.marginLeft = '100px';
    document.body.style.paddingLeft = 'auto';
    document.body.style.paddingRight = 'auto';
    document.body.style.height = '150px';
    document.body.style.paddingTop = '25px';
    document.body.style.paddingBottom = '25px';
    document.body.style.border = '5px solid black';
    document.body.appendChild(ball);
}

var mover;

function moveBall(){
    var movekey=1;
    var height = parseInt(document.body.style.height);
    mover = setInterval(()=>{
        var ball = document.getElementById('ball');
        var top = parseInt(ball.style.top);
        if(top == 0){
            mover = 1;
        }
        if(top == height){
            mover = -1;
        }
        ball.style.top = top+mover+'px';
    }, FRAME_LIMIT);
}

function stopball(){
    clearInterval(mover);
}

