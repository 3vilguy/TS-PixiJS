import * as PIXI from 'pixi.js';

var renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor: 0x1099bb});
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

var graph = new PIXI.Graphics();
graph.beginFill(0xFF0000);
graph.drawRect(0, 0, 100, 100);
graph.endFill();
stage.addChild(graph);
graph.x = graph.y = 100;
animate();

function animate() {
    requestAnimationFrame(animate);
    graph.rotation += 0.05;
    renderer.render(stage);
}
