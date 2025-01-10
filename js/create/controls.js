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
        });
    });
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
    onChange: function(color) {
        changeColor(color);
    }
});

document.getElementById('picker').addEventListener('change', function() {
    changeColor(this.value);
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

addTool('Draw', 'assets/icons/edit.svg', () => {}, tools);
addTool('Erase', 'assets/icons/erase.svg', () => {}, tools);
addTool('Fill', 'assets/icons/fill.svg', () => {}, tools);
addTool('Rect', 'assets/icons/rect.svg', () => {}, tools);
addTool('Circle', 'assets/icons/circle.svg', () => {}, tools);
addTool('Line', 'assets/icons/line.svg', () => {}, tools);
addTool('Rect Fill', 'assets/icons/rectfill.svg', () => {}, tools);
addTool('Circle Fill', 'assets/icons/circlefill.svg', () => {}, tools);