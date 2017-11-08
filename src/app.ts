import * as PIXI from 'pixi.js';

const app = new PIXI.Application(800, 600, {backgroundColor: 0x1099bb});
document.body.appendChild(app.view);

var graph = new PIXI.Graphics();
graph.beginFill(0xFF0000);
graph.drawRect(0, 0, 100, 100);
graph.endFill();
app.stage.addChild(graph);
graph.x = graph.y = 100;

app.ticker.add(update);

function update() {
    graph.rotation += 0.05;
    app.renderer.render(app.stage);
}
