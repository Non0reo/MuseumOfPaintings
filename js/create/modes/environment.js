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
    /* ctx.fillStyle = 'white'; */
    /* ctx.fillRect(0, 0, canvas.width, canvas.height); */
    /* ctx.clearRect(0, 0, canvas.width, canvas.height); */

    // Store the current transformation matrix
    ctx.save();

    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Restore the transform
    ctx.restore();
}

function copyBase64ToClipboard() {
    navigator.clipboard.writeText(canvas.toDataURL('image/png'));
    alert('Copied image code to clipboard! Use it to load using the "Load an Image" button.');
}

export { saveCanvasAsImage, clearCanvas, copyImageToClipboard, copyBase64ToClipboard };