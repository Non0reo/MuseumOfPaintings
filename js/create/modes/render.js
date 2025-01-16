import { ctx, canvas, savedPoint, mousePressed } from "../canvas.js";

//let savedPoint = savedPointOut;
//let mousePressed = false;

function draw(mousePos, callback) {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(savedPoint.x, savedPoint.y);
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
    ctx.moveTo(savedPoint.x, savedPoint.y);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
    
    if (callback) {
        callback();
    }
}

function fill(mousePos) {
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const targetColor = getPixelColor(mousePos.x, mousePos.y, data);
    const fillColor = hexToRgb(ctx.strokeStyle);
    const stack = [mousePos];

    while (stack.length) {
        const newPos = stack.pop();
        const currentColor = getPixelColor(newPos.x, newPos.y, data);

        if (currentColor.r === targetColor.r && currentColor.g === targetColor.g && currentColor.b === targetColor.b) {
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillRect(newPos.x, newPos.y, 1, 1);

            stack.push({ x: newPos.x + 1, y: newPos.y });
            stack.push({ x: newPos.x - 1, y: newPos.y });
            stack.push({ x: newPos.x, y: newPos.y + 1 });
            stack.push({ x: newPos.x, y: newPos.y - 1 });
        }
    }
}


/* Utils canvas functions */

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



export { draw, erase };