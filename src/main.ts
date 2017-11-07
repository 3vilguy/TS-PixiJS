const WIDTH : number = window.innerWidth;
const HEIGHT : number = window.innerHeight;
const BG_COLOR = 0xc1c2c4;

const renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT, { backgroundColor: BG_COLOR });
renderer.view.style.display = "block";
document.body.appendChild(renderer.view);

const stage = new PIXI.Container();
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
  var mainView:MainView = new MainView();
  stage.addChild(mainView);
  mainView.init();
}

function draw() {
  renderer.render(stage);
  requestAnimationFrame(draw);
}