// GLOBALS
const WIDTH : number = 1400;
const HEIGHT : number = 1000;
const BG_COLOR : number = 0xc1c2c4;

// Init Pixi stuff
const app = new PIXI.Application(WIDTH, HEIGHT, { backgroundColor: BG_COLOR });
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
  var mainView:MainView = new MainView();
  app.stage.addChild(mainView);
  mainView.init();

  app.ticker.add(update);
}

function update() {
  app.renderer.render(app.stage);
}