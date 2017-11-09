import * as PIXI from 'pixi.js';
import MainView from './view/MainView';
import { WIDTH, HEIGHT, BG_COLOR } from './constants/RendererConstants';

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

// Load assets
PIXI.loader
    .add(require('../assets/images/LOGO.png'))
    .add([
        require('../assets/images/safe/box_door_open.png'),
        require('../assets/images/safe/box_door.png'),
        require('../assets/images/safe/box_padlock_shadow.png'),
        require('../assets/images/safe/box_padlock.png'),
        require('../assets/images/safe/box.png'),
        // require('../assets/images/safe/safeTop.png')
    ])
    .add([
        require('../assets/bitmap_font/message_simple-export.png'),
        require('../assets/bitmap_font/message_simple-export.xml')
    ])
    .load(onAssetsLoaded);

function onAssetsLoaded() {
    console.log("onAssetsLoaded");
    init();
}

function init() {
    var mainView:MainView = new MainView();
    mainView.init();
    app.stage.addChild(mainView);
    
    app.ticker.add(update);
}

function update() {
    app.renderer.render(app.stage);
}
