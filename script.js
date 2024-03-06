const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const restart = document.getElementById('restart')
restart.addEventListener('click', () => {
    velocity.y = 0;
    position.y = circleProps.radius;
    position.x = Math.random() * canvas.width + circleProps.radius;
});

// Initialize the initial velocity of the ball
var velocity = {
    x: 20,
    y: 0
};

// Define the properties of the 2d object
const circleProps = {
    radius: 20
};

// Define the position of the object on the canvas
const position = {
    x: Math.random() * canvas.width + circleProps.radius,
    y: circleProps.radius
};

// Define the world with gravity and coefficient of restitution
const world = {
    gravity: 9.8,
    e: 0.8
};

// Initialize time prop and update it after n ms
let time = 0;
let frame_acceleration = 200
const maxVelocity = Math.sqrt(2 * world.gravity * canvas.height);
const v = () => setTimeout(() => {
    if (velocity.y <= maxVelocity) {
        velocity.y += world.gravity * time++;
        v();
    }
}, frame_acceleration);

v();

const drawCircle = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    // Draw trail effect (partially transparent circles at previous positions)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; // Set color with transparency
    for (let i = 0; i < trail.length; i++) {
        ctx.beginPath();
        ctx.arc(trail[i].x, trail[i].y, circleProps.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
    // Draw current position of the ball
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(position.x, position.y, circleProps.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    // Update trail
    trail.push({ x: position.x, y: position.y });
    if (trail.length > 10) {
        trail.shift(); // Remove oldest trail element if exceeds a certain length
    }

    // Check if the ball hit the floor
    if (position.y + velocity.y + circleProps.radius >= canvas.height) {
        velocity.y = velocity.y * world.e - velocity.y;
        time = 0;
    } else {
        position.y += velocity.y;
    }
};

let trail = []; // Trail array to store previous positions

drawCircle();

function animate() {
    drawCircle();
    requestAnimationFrame(animate);
}

animate();

document.addEventListener('keydown', (event) => {
    // Position Handlers
    if (event.key === 'A' || event.key === 'a') {
        if (position.x - velocity.x - circleProps.radius <= 0) {
            position.x = circleProps.radius;
        } else {
            position.x -= velocity.x;
        }
        drawCircle();
    } else if (event.key === 'D' || event.key === 'd') {
        if (position.x + velocity.x + circleProps.radius >= canvas.width) {
            position.x = canvas.width - circleProps.radius;
        } else {
            position.x += velocity.x;
        }
        drawCircle();
    }
});

// Function to add a new ball
function addBall() {
    const newBall = {
        position: {
            x: Math.random() * canvas.width + circleProps.radius,
            y: circleProps.radius
        },
        velocity: {
            x: 20,
            y: 0
        }
    };
    balls.push(newBall);
}

// Call addBall function when the button is clicked
const addButton = document.getElementById('addButton');
addButton.addEventListener('click', addBall);