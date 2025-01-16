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

function addColors() {
    
    colorList.forEach(color => {
        const div = document.createElement('div');
        div.classList.add('color'); 
        div.classList.add('action');
        div.style.backgroundColor = color;
        colors.appendChild(div);

        div.addEventListener('click', () => {
            ctx.strokeStyle = color;
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
        ctx.strokeStyle = color;
        const selected = document.querySelector('.color.selected');
        if (selected) selected.classList.remove('selected');
        document.getElementById('picker').classList.add('selected');
    }
});


function addTool(name, parent, action, isPermanentAction = true) {
    const div = document.createElement('div');
    const icon = document.createElement('img');
    const pathName = name.replace(/\s+/g, '').toLowerCase();
    console.log(pathName);
    div.classList.add('tool');
    div.classList.add('action');
    icon.src = `assets/icons/${pathName}.svg`;
    icon.alt = name;
    div.appendChild(icon);
    parent.appendChild(div);

    div.addEventListener('click', () => {
        if(isPermanentAction) {
            const selected = document.querySelector('.tool.selected');
            if (selected) selected.classList.remove('selected');
            div.classList.add('selected');
            mode = pathName;
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
    'Save': environment.saveCanvasAsImage,
    'Download': () => {},
    'Clear': environment.clearCanvas
};

Object.entries(toolActions).forEach(([name, action]) => {
    addTool(name, tools, action, action === null);
});

const sizeActions = {
    'Small': () => changeWidth(1),
    'Medium': () => changeWidth(5),
    'Large': () => changeWidth(10),
    'Extra Large': () => changeWidth(20)
};

Object.entries(sizeActions).forEach(([name, action]) => {
    addTool(name, size, action);
});


export { mode };