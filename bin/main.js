"use strict";
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var BG_COLOR = 0xc1c2c4;
var renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT, { backgroundColor: BG_COLOR });
renderer.view.style.display = "block";
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();
renderer.render(stage);
PIXI.loader
    .add("images/LOGO.png")
    .load(onAssetsLoaded);
function onAssetsLoaded() {
    console.log("onAssetsLoaded");
    init();
    requestAnimationFrame(draw);
}
function init() {
    var mainView = new MainView();
    stage.addChild(mainView);
    mainView.init();
}
function draw() {
    renderer.render(stage);
    requestAnimationFrame(draw);
}
//# sourceMappingURL=main.js.map