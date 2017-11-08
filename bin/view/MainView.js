"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MainView = (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainView.prototype.init = function () {
        this.addLogo();
        this.addSafes();
        this.addText();
    };
    MainView.prototype.addLogo = function () {
        var sprite = new PIXI.Sprite(PIXI.loader.resources['images/LOGO.png'].texture);
        sprite.anchor.x = 0.5;
        sprite.x = WIDTH * 0.5;
        this.addChild(sprite);
    };
    MainView.prototype.addSafes = function () {
        var container = new PIXI.Container();
        for (var i = 0; i < 3; i++) {
            var safe = new Safe();
            safe.x = (i + 0.5) * safe.width;
            container.addChild(safe);
        }
        container.x = (WIDTH - container.width) * 0.5;
        container.y = HEIGHT * 0.5;
        this.addChild(container);
    };
    MainView.prototype.addText = function () {
        var bitmapFontText = new PIXI.extras.BitmapText('HELLO...', { font: '35px message_simple-export' });
        bitmapFontText.anchor = new PIXI.Point(0.5);
        bitmapFontText.x = WIDTH * 0.5;
        bitmapFontText.y = HEIGHT - bitmapFontText.height;
        this.addChild(bitmapFontText);
    };
    return MainView;
}(PIXI.Container));
//# sourceMappingURL=MainView.js.map