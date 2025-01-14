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
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(savedPoint.x, savedPoint.y);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
        savedPoint = mousePos
    }
    else {
        savedPoint = mousePos;
        changeWidth(2)
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

function saveCanvasAsImage() {
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'canvas-image.png';
    link.click();
}

function copyImageToClipboard() {
    canvas.toBlob(blob => {
        navigator.clipboard.write([
            new ClipboardItem({
                'image/png': blob
            })
        ]);
    });
}

function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function changeColor(color) {
    ctx.strokeStyle = color;
}

function changeWidth(width) {
    ctx.lineWidth = width;
}

function fillBucket(color, clickPos) {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    const stack = [clickPos];
    const targetColor = getPixelColor(clickPos.x, clickPos.y, data);

    while (stack.length) {
        const pos = stack.pop();
        const { x, y } = pos;

        if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
            continue;
        }

        if (getPixelColor(x, y, data) !== targetColor) {
            continue;
        }

        setPixelColor(x, y, color, data);

        stack.push({ x: x + 1, y });
        stack.push({ x: x - 1, y });
        stack.push({ x, y: y + 1 });
        stack.push({ x, y: y - 1 });
    }

    ctx.putImageData(imgData, 0, 0);
}

function toBase64() {
    const dataURL = canvas.toDataURL();
    console.log(dataURL);
}