import * as render from './modes/render.js';
import { mode } from './controls.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let savedPoint;
let mousePressed = false;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);


canvas.addEventListener('mousedown', function(event) {
    if (event.button !== 0) return;
    mousePressed = true;
});

window.addEventListener('mouseup', function() {
    mousePressed = false;
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
    else {
        savedPoint = mousePos;
    }
});


function getMousePosOnCanvas(event) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: (event.clientX - rect.left - 30 ) / canvas.clientWidth * canvas.width,
        y: (event.clientY - rect.top - 30 ) / canvas.clientHeight * canvas.height
    };
}


function getPixelColor(x, y, data) {
    const index = (y * canvas.width + x) * 4;
    return {
        r: data[index],
        g: data[index + 1],
        b: data[index + 2],
        a: data[index + 3]
    };
}   



function changeColor(color) {
    ctx.strokeStyle = color;
}

function changeWidth(width) {
    ctx.lineWidth = width;
}

function toBase64() {
    const dataURL = canvas.toDataURL();
    console.log(dataURL);
}


export { 
    canvas,
    ctx,
    savedPoint,
    mousePressed
};