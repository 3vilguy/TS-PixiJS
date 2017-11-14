import { Container, Sprite } from 'pixi.js';
import { SAFE_CLICKED } from '../../constants/Events';

export default class Safe extends Container {
    private id : number;
    private isOpen : boolean;
    private box : Sprite;
    private box_door : Sprite;
    private box_door_open : Sprite;
    private padlock_shadow : Sprite;
    private padlock : Sprite;
    private coin : Sprite;

    constructor(id : number) {
        super();

        this.id = id;
        this.isOpen = false;

        this.init();
        this.closeSafe();
    }

    private init() {
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

        
        // Add coin
        this.coin = new Sprite(
            PIXI.loader.resources[require('../../../assets/images/coin/face.png')].texture
        );
        this.coin.anchor.set(0.5, 0.5);
        this.coin.y = -25;
        this.coin.scale.set(0.8, 0.8);
        this.coin.visible = false;
        this.addChild(this.coin);
    }

    public closeSafe() {
        this.isOpen = false;
        this.box.visible = this.box_door.visible = this.padlock_shadow.visible = this.padlock.visible = true;
        this.coin.visible = this.box_door_open.visible = false;
    }

    public openSafe(showCoin?:boolean) {
        this.isOpen = true;
        this.box.visible = this.box_door_open.visible = true;
        this.box_door.visible = this.padlock_shadow.visible = this.padlock.visible = false;

        if(showCoin) {
            this.coin.visible = true;
        }
    }


    public enableClicks() {
        this.box_door.interactive = true;
        this.box_door.buttonMode = true;
        this.box_door.on('pointerdown', this.onButtonDown);
    }

    public disableClicks() {
        this.box_door.interactive = false;
        this.box_door.buttonMode = false;
        this.box_door.off('pointerdown', this.onButtonDown);
    }

    private onButtonDown = () => {
        this.emit(SAFE_CLICKED, this);
    }


    get ID() {
        return this.id;
    }

    get IS_OPEN() {
        return this.isOpen;
    }
}