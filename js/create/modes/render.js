import { ctx, canvas, previousPoint, startPoint, mousePressed } from "../canvas.js";
import { actualColor } from "../controls.js";

//let previousPoint = previousPointOut;
//let mousePressed = false;

function draw(mousePos, callback) {
    changeColor(actualColor);
    ctx.imageSmoothingEnabled = false
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(previousPoint.x, previousPoint.y);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
    
    if (callback) {
        callback();
    }
}

//erase by putting white color on the canvas not in a brush way but with sharp edges
function erase(mousePos, callback) {
    ctx.imageSmoothingEnabled = false,
    ctx.strokeStyle = "white";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(previousPoint.x, previousPoint.y);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
    
    if (callback) {
        callback();
    }
}

function line(mousePos) {
    changeColor(actualColor);
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
}


/* Utils canvas functions */

function changeColor(color) {
    ctx.imageSmoothingEnabled = false;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function changeWidth(width) {
    ctx.lineWidth = width;
}

function toBase64() {
    const dataURL = canvas.toDataURL();
    console.log(dataURL);
}



export { 
    draw,
    erase,
    line,
    
    changeWidth };