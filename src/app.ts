import * as PIXI from 'pixi.js';

import GameController from './controller/GameController';
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
        require('../assets/images/pep_0.png'),
        require('../assets/images/pep_1.png'),
        require('../assets/images/pep_2.png'),
        require('../assets/images/pep_3.png'),
        require('../assets/images/pep_4.png'),
        require('../assets/images/pep_5.png')
    ])
    .add(require('../assets/images/coin/face.png'))
    .add(require('../assets/images/cta_panelMessage.png'))
    .add(require('../assets/images/cta_textContinue.png'))
    .add([
        require('../assets/bitmap_font/message_simple-export.png'),
        require('../assets/bitmap_font/message_simple-export.xml')
    ])
    .load(onAssetsLoaded);

function onAssetsLoaded() {
    init();
}

function init() {
    var gameController:GameController = new GameController(app.stage);
    gameController.init();
    
    app.ticker.add(update);
}

function update() {
    app.renderer.render(app.stage);
}
