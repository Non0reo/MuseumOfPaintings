import { ctx, canvas } from "../canvas.js";

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


export { saveCanvasAsImage, clearCanvas };