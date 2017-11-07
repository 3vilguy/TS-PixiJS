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
var Safe = (function (_super) {
    __extends(Safe, _super);
    function Safe() {
        var _this = _super.call(this) || this;
        _this.init();
        _this.closeSafe();
        return _this;
    }
    Safe.prototype.init = function () {
        this.box = new PIXI.Sprite(PIXI.loader.resources['images/safe/box.png'].texture);
        this.box.anchor.set(0.5, 0.5);
        this.addChild(this.box);
        this.box_door = new PIXI.Sprite(PIXI.loader.resources['images/safe/box_door.png'].texture);
        this.box_door.anchor.set(0.5, 0.5);
        this.box_door.y = -10;
        this.addChild(this.box_door);
        this.box_door_open = new PIXI.Sprite(PIXI.loader.resources['images/safe/box_door_open.png'].texture);
        this.box_door_open.anchor.set(0.5, 0.5);
        this.box_door_open.x = 125;
        this.box_door_open.y = -10;
        this.addChild(this.box_door_open);
        this.padlock_shadow = new PIXI.Sprite(PIXI.loader.resources['images/safe/box_padlock_shadow.png'].texture);
        this.padlock_shadow.anchor.set(0.5, 0.5);
        this.addChild(this.padlock_shadow);
        this.padlock = new PIXI.Sprite(PIXI.loader.resources['images/safe/box_padlock.png'].texture);
        this.padlock.anchor.set(0.5, 0.5);
        this.padlock.x = 5;
        this.padlock.y = -10;
        this.addChild(this.padlock);
    };
    Safe.prototype.closeSafe = function () {
        this.box.visible = this.box_door.visible = this.padlock_shadow.visible = this.padlock.visible = true;
        this.box_door_open.visible = false;
    };
    Safe.prototype.openSafe = function () {
        this.box.visible = this.box_door_open.visible = true;
        this.box_door.visible = this.padlock_shadow.visible = this.padlock.visible = false;
    };
    return Safe;
}(PIXI.Container));
//# sourceMappingURL=Safe.js.map