var canvas = document.getElementById("MyCanvas");
var ctx = canvas.getContext("2d");


var space = { width: 1000, height: 1000 };

document.getElementById("MyCanvas").setAttribute("width", String(space.width));
document.getElementById("MyCanvas").setAttribute("height", String(space.height));

var times = 3600 * 24;

var scale = 0.0007;

var FPS = 100;

var G = 6.67408 * Math.pow(10, -11) * Math.pow(1000, -3); // km^3 kg^-1 s^-2

var earth = { radius: 6371 /* km */, x: space.width / 2, y: space.height / 2, mass: 5.972 * Math.pow(10, 24)/* kg */ };
var moon = {R: 362600, radius: 1737.1 /* km */, x: space.width / 2, y: space.height / 2 - 362600 * scale, mass: 7.36 * Math.pow(10, 22)/* kg */, speed: { x: 1.07139, y: 0 }/* km/s */, tail: [], removeTail: function () {
        this.tail.shift();
    }, markTail: function () {
        this.tail.push({ x: this.x, y: this.y });
    }, move: function () {
        this.R = Math.sqrt(Math.pow(earth.x - this.x, 2) + Math.pow(earth.y - this.y, 2)) / scale;

        // if (this.R != NaN && Math.round(this.R + this.R / FPS * times * 1) != 0 && Math.round(this.R / FPS * times * 1) != 0) {
        this.speed.x += (G * earth.mass / Math.pow(this.R, 2) * Math.sign(this.R) - G * moon.mass / Math.pow(this.R, 2) * Math.sign(this.R)) * ((earth.x - this.x) / (this.R * scale)) / FPS * times;
        this.speed.y += (G * earth.mass / Math.pow(this.R, 2) * Math.sign(this.R) - G * moon.mass / Math.pow(this.R, 2) * Math.sign(this.R)) * ((earth.y - this.y) / (this.R * scale)) / FPS * times;
        // }
        // console.log(G * earth.mass / Math.pow(this.Ry, 2) * Math.sign(this.Ry) / FPS - G * moon.mass / Math.pow(this.Ry, 2) * Math.sign(this.Ry) / FPS);
        // console.log(G * earth.mass / Math.pow(this.Rx, 2) * Math.sign(this.Rx) / FPS - G * moon.mass / Math.pow(this.Rx, 2) * Math.sign(this.Rx) / FPS);
        // console.log(this.speed.x, this.speed.y);
        // console.log(moon.R / scale);

        // if(Math.round((earth.x - this.x) * 0.1) == 0){
        //     console.log(this.R);
        // }
        // if(Math.round((earth.y - this.y) * 0.1) == 0){
        //     console.log(this.R);
        // }

        this.x += this.speed.x * scale / FPS * times;
        this.y += this.speed.y * scale / FPS * times;
        // console.log(this.x, this.y);
    }
};

// moon.x = space.width/2 - 357000 * scale / Math.sqrt(2);
// moon.y = space.height/2 - 357000 * scale / Math.sqrt(2);
// moon.speed =  {x: 95213 * scale / Math.sqrt(2), y: -95213 * scale / Math.sqrt(2)};



var speed = { max: 0, min: Math.sqrt(Math.abs(Math.pow(moon.speed.x, 2) + Math.pow(moon.speed.y, 2))), average: 0, total: 0 };
var radius = { max: 0, min: moon.R, average: 0, total: 0 };




var i = 0;
function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, space.width, space.height);

    moon.move();
    if (i % (Math.round(1000 / times * FPS) + 1) == 0) moon.markTail();
    // if(i%200 == 0)moon.removeTail();

    // ctx.beginPath();
    // ctx.fillStyle = "red";
    // ctx.arc(earth.x, earth.y, moon.R * scale, 0, 2 * Math.PI);
    // ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.arc(earth.x, earth.y, earth.radius * scale, 0, 2 * Math.PI);
    ctx.fill();

    for (var j = 0; j < moon.tail.length; j++) {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(moon.tail[j].x, moon.tail[j].y, 1500 * scale, 0, 2 * Math.PI);
        ctx.fill();
    }

    ctx.beginPath();
    ctx.fillStyle = "gray";
    ctx.arc(moon.x, moon.y, moon.radius * scale, 0, 2 * Math.PI);
    ctx.fill();
    i++;


    // if (Math.sqrt(Math.abs(Math.pow(moon.speed.x, 2) + Math.pow(moon.speed.y, 2))) > speed.max) speed.max = Math.sqrt(Math.abs(Math.pow(moon.speed.x, 2) + Math.pow(moon.speed.y, 2)));
    // if (Math.sqrt(Math.abs(Math.pow(moon.speed.x, 2) + Math.pow(moon.speed.y, 2))) < speed.min) speed.min = Math.sqrt(Math.abs(Math.pow(moon.speed.x, 2) + Math.pow(moon.speed.y, 2)));
    // speed.total += Math.sqrt(Math.abs(Math.pow(moon.speed.x, 2) + Math.pow(moon.speed.y, 2)));
    // speed.average = speed.total / i;

    // if (moon.R > radius.max) radius.max = moon.R;
    // if (moon.R < radius.min) radius.min = moon.R;
    // radius.total += moon.R;
    // radius.average = radius.total / i;

    // console.log(speed.max / scale, speed.min / scale, speed.average / scale);
    // console.log(radius.max, radius.min, radius.average);
}

setInterval(draw, 1000 / FPS);