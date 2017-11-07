class MainView extends PIXI.Container {
    public init() {
        this.addLogo();
        this.addSafes();
        this.addText();
    }

    private addLogo() {
        var sprite = new PIXI.Sprite(
            PIXI.loader.resources['images/LOGO.png'].texture
        );
        sprite.anchor.x = 0.5;
        sprite.x = window.innerWidth * 0.5;
        this.addChild(sprite);
    }

    private addSafes() {
        var container = new PIXI.Container();
        for(var i=0; i< 3; i++) {
            var safe:Safe = new Safe();
            safe.x = (i + 0.5) * safe.width;
            container.addChild(safe);
        }

        container.x = (window.innerWidth - container.width) * 0.5;
        container.y = window.innerHeight * 0.5;
        this.addChild(container);
    }

    private addText() {
        var bitmapFontText = new PIXI.extras.BitmapText('HELLO...', { font: '35px message_simple-export'});
        bitmapFontText.anchor = new PIXI.Point(0.5);
        bitmapFontText.x = window.innerWidth * 0.5;
        bitmapFontText.y = window.innerHeight - bitmapFontText.height;

        this.addChild(bitmapFontText);
    }
}