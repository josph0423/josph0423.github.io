var canvas = document.getElementById("MyCanvas");
var ctx = canvas.getContext("2d");


var space = { width: 10000, height: 6000 };

document.getElementById("MyCanvas").setAttribute("width", String(space.width));
document.getElementById("MyCanvas").setAttribute("height", String(space.height));

var times = 1;

var scale = 0.005;

var FPS = 1000;

var G = 6.67408 * Math.pow(10, -11) * Math.pow(1000, -3); // km^3 kg^-1 s^-2

var earth = { radius: 6371 * scale /* km */, x: space.width/2, y: space.height/2, mass: 5.972 * Math.pow(10, 24)/* kg */};
var moon = { Rx: 0, Ry: 0, radius: 1737.1 * scale /* km */, x: space.width/2, y: space.height/2 - 357000 * scale, mass: 7.36 * Math.pow(10, 22)/* kg */, speed: {x: 95213 * scale, y: 0 * scale}/* km/s */, tail: [], removeTail: function(){
    this.tail.shift();pace.height/2 - 357000 * scale
}, markTail: function (){
    this.tail.push({x: this.x, y: this.y});
}, move: function (){
    this.Rx = (earth.x - this.x); /* km */
    this.Ry = (earth.y - this.y);

    if(this.Rx != NaN && Math.round(this.Rx + this.Rx /FPS * 1) != 0 && Math.round(this.Rx /FPS * 1) != 0){
        this.speed.x += (G * earth.mass / Math.pow(this.Rx, 2) * Math.sign(this.Rx) / FPS - G * moon.mass / Math.pow(this.Rx, 2) * Math.sign(this.Rx) / FPS) / scale;
    }/* km/s     k^3 kg^-1 s^-2  *  kg     /    km^2          *     s  */
    if(this.Ry != NaN && Math.round(this.Ry + this.Ry /FPS * 1) != 0 && Math.round(this.Ry /FPS * 1) != 0){
        this.speed.y += (G * earth.mass / Math.pow(this.Ry, 2) * Math.sign(this.Ry) / FPS - G * moon.mass / Math.pow(this.Ry, 2) * Math.sign(this.Ry) / FPS) / scale;
    }
    // console.log(G * earth.mass / Math.pow(this.Ry, 2) * Math.sign(this.Ry) / FPS - G * moon.mass / Math.pow(this.Ry, 2) * Math.sign(this.Ry) / FPS);
    // console.log(G * earth.mass / Math.pow(this.Rx, 2) * Math.sign(this.Rx) / FPS - G * moon.mass / Math.pow(this.Rx, 2) * Math.sign(this.Rx) / FPS);
    // console.log(this.speed.x, this.speed.y);
    // console.log(moon);

    // if(Math.round((earth.y - this.y) * 1) == 0){
    //     console.log(this.speed.x);
    // }

    this.x += this.speed.x / FPS;
    this.y += this.speed.y / FPS;
    // console.log(this.x, this.y);
}};

// moon.x = space.width/2 - 357000 * scale / Math.sqrt(2);
// moon.y = space.height/2 - 357000 * scale / Math.sqrt(2);
// moon.speed =  {x: 95213 * scale / Math.sqrt(2), y: -95213 * scale / Math.sqrt(2)};



var speed = {max: 0, min: Math.sqrt(Math.abs(Math.pow(moon.speed.x, 2) + Math.pow(moon.speed.y, 2))), average: 0, total: 0};
var radius = {max: 0, min: Math.sqrt(Math.abs(Math.pow(moon.Rx, 2) + Math.pow(moon.Ry, 2))), average: 0, total: 0};




var i = 0;
function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, space.width, space.height);

    moon.move();
    if(i%100 == 0)moon.markTail();
    // if(i%200 == 0)moon.removeTail();

    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.arc(earth.x, earth.y, earth.radius, 0, 2 * Math.PI);
    ctx.fill();

    for(var j = 0; j < moon.tail.length; j++){
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(moon.tail[j].x, moon.tail[j].y, 8, 0, 2 * Math.PI);
        ctx.fill();
    }

    ctx.beginPath();
    ctx.fillStyle = "gray";
    ctx.arc(moon.x, moon.y, moon.radius, 0, 2 * Math.PI);
    ctx.fill();
    i++;


    if(Math.sqrt(Math.abs(Math.pow(moon.speed.x, 2) + Math.pow(moon.speed.y, 2))) > speed.max)speed.max = Math.sqrt(Math.abs(Math.pow(moon.speed.x, 2) + Math.pow(moon.speed.y, 2)));
    if(Math.sqrt(Math.abs(Math.pow(moon.speed.x, 2) + Math.pow(moon.speed.y, 2))) < speed.min)speed.min = Math.sqrt(Math.abs(Math.pow(moon.speed.x, 2) + Math.pow(moon.speed.y, 2)));
    speed.total += Math.sqrt(Math.abs(Math.pow(moon.speed.x, 2) + Math.pow(moon.speed.y, 2)));
    speed.average = speed.total / i;

    if(Math.sqrt(Math.abs(Math.pow(moon.Rx, 2) + Math.pow(moon.Ry, 2))) > radius.max)radius.max = Math.sqrt(Math.abs(Math.pow(moon.Rx, 2) + Math.pow(moon.Ry, 2)));
    if(Math.sqrt(Math.abs(Math.pow(moon.Rx, 2) + Math.pow(moon.Ry, 2))) < speed.min)radius.min = Math.sqrt(Math.abs(Math.pow(moon.Rx, 2) + Math.pow(moon.Ry, 2)));
    radius.total += Math.sqrt(Math.abs(Math.pow(moon.Rx, 2) + Math.pow(moon.Ry, 2)));
    radius.average = radius.total / i;

    // console.log(speed.max/scale, speed.min/scale, speed.average/scale);
    // console.log(radius.max/scale, radius.min/scale, radius.average/scale);
}

setInterval(draw, 1000 / times / FPS);