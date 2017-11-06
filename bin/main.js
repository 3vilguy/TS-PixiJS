"use strict";
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var BG_COLOR = 0xc1c2c4;
var renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT, { backgroundColor: BG_COLOR });
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();
requestAnimationFrame(draw);
function draw() {
    renderer.render(stage);
    requestAnimationFrame(draw);
}
