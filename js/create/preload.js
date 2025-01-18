import { loadCanvasImage } from './canvas.js';

const loadButton = document.getElementById('load');

loadButton.onclick = function() {
    loadCanvasImage();
}