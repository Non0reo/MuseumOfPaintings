import * as render from './modes/render.js';
import { mode } from './controls.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let previousPoint;
let startPoint;
let mousePressed = false;
let savedCanvas = null;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.translate(0.5, 0.5);


//phone events

canvas.addEventListener('touchstart', function(event) {
    event.preventDefault();
    let mousePos = getMousePosOnCanvas(event.touches[0]);
    previousPoint = mousePos;
    startPoint = mousePos;
    eval(`render.${mode}(mousePos);`);
});

canvas.addEventListener('touchmove', function(event) {
    event.preventDefault();
    let mousePos = getMousePosOnCanvas(event.touches[0]);
    console.log(mousePos, mousePressed);

    if (previousPoint) {
        eval(`render.${mode}(mousePos, () => previousPoint = mousePos);`);
    }
    else previousPoint = mousePos;
});


//computer events

canvas.addEventListener('mousedown', function(event) {
    if (event.button !== 0) return;
    mousePressed = true;
    
    let mousePos = getMousePosOnCanvas(event);
    previousPoint = mousePos;
    startPoint = mousePos;
    savedCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height);
    eval(`render.${mode}(mousePos);`);
});

canvas.addEventListener('mousemove', function(event) {
    let mousePos = getMousePosOnCanvas(event);

    if (!mousePressed) {
        previousPoint = null;
        return;
    }

    if (previousPoint) {
        eval(`render.${mode}(mousePos, () => previousPoint = mousePos);`);
    }
    else previousPoint = mousePos;
});

window.addEventListener('mouseup', function() {
    mousePressed = false;
});



function getMousePosOnCanvas(event) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: (event.clientX - rect.left - 30 ) / canvas.clientWidth * canvas.width,
        y: (event.clientY - rect.top - 30 ) / canvas.clientHeight * canvas.height
    };
}

//the image is given using Base64 encoding
function loadCanvasImage(image) {
    if(!image) {
        image ??= prompt('Please enter the code of the image');
    }

    const img = new Image();
    img.onload = () => {
        ctx.drawImage(img, -1, -1);
    };
    img.src = image;
}


export { 
    canvas,
    ctx,
    previousPoint,
    startPoint,
    mousePressed,
    loadCanvasImage
};