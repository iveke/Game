const canvas = document.getElementById('canvas1');
const ctx1 = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
canvas2.width = 800;
canvas2.height = 600;

const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas3.getContext('2d');
canvas3.width = 800;
canvas3.height = 600;

const canvas4 = document.getElementById('canvas4');
const ctx4 = canvas4.getContext('2d');
canvas4.width = 800;
canvas4.height = 600;

const canvas5 = document.getElementById('canvas5');
const ctx5 = canvas5.getContext('2d');
canvas5.width = 800;
canvas5.height = 600;

// global variables
const grid = 80;
let keys = [];
let score = 0;
let collisionCount = 0;
let frame = 0;
let gameSpeed = 1;
const particlesArray = [];
const maxParticles = 300;
const ripplesArray = [];
const carsArray = [];
const logsArray = [];


class Frogger {
    constructor() {
        this.spriteWidth = 250;
        this.spriteHeight = 250;
        this.width = this.spriteWidth / 5;
        this.height = this.spriteHeight / 5;
        this.x = canvas.width / 2 - this.width / 5;
        this.y = canvas.height - this.height - 40;
        this.moving = false;
        this.frameX = 0;
        this.frameY = 0;
    }
    update() {
        if (keys[38]) {
            if (this.moving === false) { //up
                this.y -= grid;
                this.moving = true;

            }
        }
        if (keys[40]) { //down
            if (this.y < canvas.height - this.height * 2 && this.moving === false) { //up
                this.y += grid;
                this.moving = true;
            }
        }
        if (keys[37]) { //left
            if (this.x > this.width && this.moving === false) { //up
                this.x -= grid;
                this.moving = true;
            }
        }
        if (keys[39]) { //right
            if (this.x < canvas.width - this.width * 2 && this.moving === false) { //up
                this.x += grid;
                this.moving = true;
            }
        }
        if (this.y < 0) scored();
    }
    draw() {
        ctx3.fillStyle = 'green';
        ctx3.fillRect(this.x, this.y, this.width, this.height);
    }
    jump() {
        console.log("jump");
    }
}

const frogger = new Frogger();


function animate() {
    ctx1.clearRect(0, 0, canvas.width, canvas.height)
    ctx3.clearRect(0, 0, canvas.width, canvas.height);
    frogger.draw();
    frogger.update();
    handleObstacles();
    requestAnimationFrame(animate);

}

animate()


// event listener
window.addEventListener('keydown', (e) => {
    keys = [];
    keys[e.keyCode] = true;
    if (keys[37] || keys[38] || keys[39] || keys[40]) {
        frogger.jump();
    }
})

window.addEventListener('keyup', (e) => {
    delete keys[e.keyCode];
    frogger.moving = false;
})

function scored() {
    score++;
    gameSpeed += 0.05;
    frogger.x = canvas.width / 2 - frogger.width / 2;
    frogger.y = canvas.height - frogger.height - 40;
}

class Obstacle {
    constructor(x, y, width, height, speed, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.type = type;
    }
    draw() {
        ctx1.fillStyle = "blue";
        ctx1.fillRect(this.x, this.y, this.width, this.height);
    }
    update() {
        this.x += this.speed * gameSpeed;
        if (this.speed > 0) {
            if (this.x > canvas.width + this.width) {
                this.x = 0 - this.width;
            }
        } else {
            if (this.x < 0 - this.width) {
                this.x = canvas.width + this.width;
            }
        }

    }
}

function initObstacles() {
    //lane 1
    for (let i = 0; i < 3; i++) {
        let x = i * 400;
        carsArray.push(new Obstacle(x, canvas.height - grid * 2 - 20, grid * 2, grid, 1.5, "car"))
    }
    //lane 2
    for (let i = 0; i < 3; i++) {
        let x = i * 400;
        carsArray.push(new Obstacle(x, canvas.height - grid * 3 - 20, grid * 2, grid, -2.5, "car"))
    }
    //lane 3
    for (let i = 0; i < 3; i++) {
        let x = i * 405;
        carsArray.push(new Obstacle(x, canvas.height - grid * 4 - 20, grid * 2, grid, 4, "car"))
    }
    //lane 4
    for (let i = 0; i < 3; i++) {
        let x = i * 400;
        logsArray.push(new Obstacle(x, canvas.height - grid * 5 - 20, grid * 2.5, grid, -6, "log"))
    }
    //lane 5
    for(let i =0; i <3; i++){
        let x = i*350;
        logsArray.push(new Obstacle(x, canvas.height - grid *6 -20, grid *1.3,grid, 3.5,"log"))
    }
}
initObstacles();

function handleObstacles() {
    for (let i = 0; i < carsArray.length; i++) {
        carsArray[i].update();
        carsArray[i].draw();
    }
    for (let i = 0; i < logsArray.length; i++) {
        logsArray[i].update();
        logsArray[i].draw();
    }
}