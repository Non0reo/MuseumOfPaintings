const colors = document.getElementById('colors');
const tools = document.getElementById('tools');
const brushs = document.getElementById('brushs');
const sizes = document.getElementById('sizes');

const coreColors = [
    "black", "white", "red", "blue", "green", 
    "yellow", "cyan", "magenta", "gray"
];
  
const distantColors = [
    "aliceblue", "blueviolet", "chartreuse", "coral", "darkorange",
    "deepskyblue", "gold", "indigo", "limegreen", "orangered",
    "purple", "rebeccapurple", "seagreen", "teal", "turquoise"
];

let colorList = [...new Set([...coreColors, ...distantColors])];


let mode = 'draw'; // draw, erase, fill, rect, circle, line, rectfill, circlefill

function addColors() {
    
    colorList.forEach(color => {
        const div = document.createElement('div');
        div.classList.add('color'); 
        div.classList.add('action');
        div.style.backgroundColor = color;
        colors.appendChild(div);

        div.addEventListener('click', () => {
            changeColor(color);
            const selected = document.querySelector('.color.selected');
            if (selected) selected.classList.remove('selected');
            div.classList.add('selected');
        });
    });

    //give the first color a selected class

    colors.children[0].classList.add('selected');
}

addColors();

Coloris({
    el: '#picker',
    themeMode: 'dark',
    alpha: false,
    defaultColor: '#000000',
    closeButton: true,
    format: 'hex',
    wrap: false,
    focusInput: false,
    closeLabel: 'Select',
    onChange: function(color) {
        changeColor(color);
        const selected = document.querySelector('.color.selected');
        if (selected) selected.classList.remove('selected');
        document.getElementById('picker').classList.add('selected');
    }
});


function addTool(name, path, action, parent) {
    const div = document.createElement('div');
    const icon = document.createElement('img');
    div.classList.add('tool');
    div.classList.add('action');
    icon.src = path;
    icon.alt = name;
    div.appendChild(icon);
    parent.appendChild(div);

    div.addEventListener('click', action);
}

addTool('Draw', 'assets/icons/edit.svg', () => {
    mode = 'draw';
}, tools);

addTool('Erase', 'assets/icons/erase.svg', () => {
    mode = 'erase';
    ctx.imageSmoothingEnabled = true,
    ctx.fillStyle = 'white';
    console.log('erase');
}, tools);
addTool('Fill', 'assets/icons/fill.svg', () => {}, tools);
addTool('Rect', 'assets/icons/rect.svg', () => {}, tools);
addTool('Circle', 'assets/icons/circle.svg', () => {}, tools);
addTool('Line', 'assets/icons/line.svg', () => {}, tools);
addTool('Rect Fill', 'assets/icons/rectfill.svg', () => {}, tools);
addTool('Circle Fill', 'assets/icons/circlefill.svg', () => {}, tools);
addTool('Save', 'assets/icons/save.svg', saveCanvasAsImage, tools);
addTool('Download', 'assets/icons/download.svg', () => {}, tools);
addTool('Clear', 'assets/icons/clear.svg', clearCanvas, tools);