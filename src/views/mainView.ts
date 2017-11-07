class MainView extends PIXI.Container {
    public init() {
        this.addLogo();
    }

    private addLogo() {
        var sprite = new PIXI.Sprite(
            PIXI.loader.resources["images/LOGO.png"].texture
          );
          sprite.anchor.x = 0.5;
        sprite.x = window.innerWidth * 0.5;
        this.addChild(sprite);
    }
}