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
    .add('images/LOGO.png')
    .add('bitmap_font/message_simple-export.xml')
    .add([
    'images/safe/box_door_open.png',
    'images/safe/box_door.png',
    'images/safe/box_padlock_shadow.png',
    'images/safe/box_padlock.png',
    'images/safe/box.png',
    'images/safe/safeTop.png'
])
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
//# sourceMappingURL=Main.js.map