import { Container, Sprite } from 'pixi.js';

export default class Safe extends Container {
    private bg : Sprite;
    private tfHeader : PIXI.extras.BitmapText;
    private tfMid : PIXI.extras.BitmapText;

    constructor() {
        super();

        this.init();
        this.interactive = true;
    }

    init() {
        this.bg = new Sprite(
            PIXI.loader.resources[require('../../../assets/images/cta_panelMessage.png')].texture
        );
        this.bg.anchor.set(0.5, 0.5);
        this.addChild(this.bg);

        this.tfHeader = new PIXI.extras.BitmapText('YOU WON!', { font: '45px message_simple-export'});
        this.tfHeader.anchor = new PIXI.Point(0.5);
        this.tfHeader.y = - this.bg.height * 0.3;
        this.addChild(this.tfHeader);

        this.tfMid = new PIXI.extras.BitmapText('', { font: '90px message_simple-export'});
        this.tfMid.anchor = new PIXI.Point(0.5);
        this.addChild(this.tfMid);
    }

    public setMidText(midValue : string) {
        this.tfMid.text = "£" + midValue;
    }
}