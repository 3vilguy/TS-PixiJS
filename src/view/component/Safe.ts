import { Container, Sprite } from 'pixi.js';

export default class Safe extends Container {
    private box : Sprite;
    private box_door : Sprite;
    private box_door_open : Sprite;
    private padlock_shadow : Sprite;
    private padlock : Sprite;

    constructor() {
        super();
        this.init();
        this.closeSafe();
    }

    init() {
        // Add empty box
        this.box = new Sprite(
            PIXI.loader.resources[require('../../../assets/images/safe/box.png')].texture
        );
        this.box.anchor.set(0.5, 0.5);
        this.addChild(this.box);

        // Add box door
        this.box_door = new Sprite(
            PIXI.loader.resources[require('../../../assets/images/safe/box_door.png')].texture
        );
        this.box_door.anchor.set(0.5, 0.5);
        this.box_door.y = -10;
        this.addChild(this.box_door);

        // Add box door open
        this.box_door_open = new Sprite(
            PIXI.loader.resources[require('../../../assets/images/safe/box_door_open.png')].texture
        );
        this.box_door_open.anchor.set(0.5, 0.5);
        this.box_door_open.x = 125;
        this.box_door_open.y = -10;
        this.addChild(this.box_door_open);

        // Add padlock's shadow
        this.padlock_shadow = new Sprite(
            PIXI.loader.resources[require('../../../assets/images/safe/box_padlock_shadow.png')].texture
        );
        this.padlock_shadow.anchor.set(0.5, 0.5);
        this.addChild(this.padlock_shadow);

        // Add padlock
        this.padlock = new Sprite(
            PIXI.loader.resources[require('../../../assets/images/safe/box_padlock.png')].texture
        );
        this.padlock.anchor.set(0.5, 0.5);
        this.padlock.x = 5;
        this.padlock.y = -10;
        this.addChild(this.padlock);
    }

    closeSafe() {
        this.box.visible = this.box_door.visible = this.padlock_shadow.visible = this.padlock.visible = true;
        this.box_door_open.visible = false;
    }

    openSafe() {
        this.box.visible = this.box_door_open.visible = true;
        this.box_door.visible = this.padlock_shadow.visible = this.padlock.visible = false;
    }
}