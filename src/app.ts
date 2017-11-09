import * as PIXI from 'pixi.js';

// GLOBALS
const WIDTH : number = 800;
const HEIGHT : number = 600;
const BG_COLOR : number = 0x1099bb;

// Init Pixi stuff
const app = new PIXI.Application(WIDTH, HEIGHT, {backgroundColor: BG_COLOR});
app.view.style.display = "block";
app.renderer.autoResize = true;
document.body.appendChild(app.view);
onWindowResize();

// Resizing
if (app.renderer.autoResize) {
    window.onresize = onWindowResize;
}

function onWindowResize() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    app.renderer.resize(width, height);
    app.view.style.width = width + "px";
    app.view.style.height = height + "px";

    app.stage.x = (window.innerWidth - WIDTH) * 0.5;
}


// Other stuff
var graph = new PIXI.Graphics();
graph.beginFill(0xFF0000);
graph.drawRect(0, 0, 100, 100);
graph.endFill();
app.stage.addChild(graph);
graph.x = WIDTH * 0.5;
graph.y = HEIGHT * 0.5;

app.ticker.add(update);

function update() {
    graph.rotation += 0.05;
    app.renderer.render(app.stage);
}
