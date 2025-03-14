import * as environment from './modes/environment.js';
import * as render from './modes/render.js';
import { ctx } from './canvas.js';

const colors = document.getElementById('colors');
const tools = document.getElementById('tools');
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
let actualColor = 'black';

function addColors() {
    
    colorList.forEach(color => {
        const div = document.createElement('div');
        div.classList.add('color'); 
        div.classList.add('action');
        div.style.backgroundColor = color;
        div.title = String(color).charAt(0).toUpperCase() + String(color).slice(1);
        colors.appendChild(div);

        div.addEventListener('click', () => {
            setSelectedColor(color, div);
        });
    });

    colors.children[0].classList.add('selected');
}

addColors();

Coloris({
    // el: '#picker',
    // themeMode: 'dark',
    // alpha: false,
    // defaultColor: '#000000',
    // closeButton: true,
    // format: 'hex',
    // wrap: false,
    // focusInput: false,
    // closeLabel: 'Select',
    onChange: function(color) {
        setSelectedColor(color, document.getElementById('picker'));
    }
});

function setSelectedColor(color, element) {
    actualColor = color;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    const selected = document.querySelector('.color.selected');
    if (selected) selected.classList.remove('selected');
    element.classList.add('selected');
}

function addTool(name, parent, action, isPermanentAction = true) {
    const div = document.createElement('div');
    const icon = document.createElement('img');
    const pathName = name.replace(/\s+/g, '').toLowerCase();
    console.log(pathName);
    div.classList.add(parent.id);
    div.classList.add('action');
    icon.src = `assets/icons/${parent.id}/${pathName}.svg`;
    icon.alt = name;
    icon.title = name;
    div.appendChild(icon);
    console.dir(parent);
    parent.appendChild(div);

    div.addEventListener('click', () => {
        if(isPermanentAction) {
            const selected = document.querySelector(`.${parent.id}.selected`);
            if (selected) selected.classList.remove('selected');
            div.classList.add('selected');
            if(parent.id !== 'size') mode = pathName;
        }
        if(action) action()
    });
}

const toolActions = {
    'Draw': null,
    'Erase': null,
    'Fill': null,
    'Rect': null,
    'Circle': null,
    'Line': null,
    'Rect Fill': null,
    'Circle Fill': null,
    'Save': environment.copyBase64ToClipboard,
    'Download': environment.saveCanvasAsImage,
    'Clear': environment.clearCanvas
};

const sizeActions = {
    'Small': () => render.changeWidth(1),
    'Medium': () => render.changeWidth(3),
    'Large': () => render.changeWidth(6),
    'Extra Large': () => render.changeWidth(10)
};

Object.entries(toolActions).forEach(([name, action]) => {
    addTool(name, tools, action, action === null);
});

Object.entries(sizeActions).forEach(([name, action]) => {
    addTool(name, size, action);
});

tools.children[0].classList.add('selected');
size.children[0].classList.add('selected');


export { mode, actualColor };