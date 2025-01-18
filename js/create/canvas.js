import * as render from './modes/render.js';
import { mode } from './controls.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let savedPoint;
let mousePressed = false;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.translate(0.5, 0.5);

canvas.addEventListener('mousedown', function(event) {
    if (event.button !== 0) return;
    mousePressed = true;
});

window.addEventListener('mouseup', function() {
    mousePressed = false;
});

canvas.addEventListener('click', function(event) {
    let mousePos = getMousePosOnCanvas(event);
    savedPoint = mousePos;
    eval(`render.${mode}(mousePos);`);
});

canvas.addEventListener('mousemove', function(event) {
    let mousePos = getMousePosOnCanvas(event);

    if (!mousePressed) {
        savedPoint = null;
        return;
    }

    if (savedPoint) {
        eval(`render.${mode}(mousePos, () => savedPoint = mousePos);`);
    }
    else savedPoint = mousePos;
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
        ctx.drawImage(img, 0, 0);
    };
    img.src = image;
}


export { 
    canvas,
    ctx,
    savedPoint,
    mousePressed,
    loadCanvasImage
};