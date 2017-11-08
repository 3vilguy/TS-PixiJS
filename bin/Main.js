"use strict";
var WIDTH = 1400;
var HEIGHT = 1000;
var BG_COLOR = 0xc1c2c4;
var app = new PIXI.Application(WIDTH, HEIGHT, { backgroundColor: BG_COLOR });
app.renderer.autoResize = true;
document.body.appendChild(app.view);
onWindowResize();
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
}
function init() {
    var mainView = new MainView();
    app.stage.addChild(mainView);
    mainView.init();
    app.ticker.add(update);
}
function update() {
    app.renderer.render(app.stage);
}
//# sourceMappingURL=Main.js.map