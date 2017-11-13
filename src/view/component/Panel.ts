import { Container, Sprite } from 'pixi.js';
import { RESTART_GAME } from '../../constants/Events';

export default class Safe extends Container {
    private bg : Sprite;
    private btn : Sprite;
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
        this.tfMid.y = - this.bg.height * 0.1;
        this.addChild(this.tfMid);

        this.btn = new Sprite(
            PIXI.loader.resources[require('../../../assets/images/cta_textContinue.png')].texture
        );
        this.btn.anchor.set(0.5, 0.5);
        this.btn.y = this.bg.height * 0.2;
        this.btn.interactive = true;
        this.btn.buttonMode = true;
        this.addChild(this.btn);
        this.btn.on('pointerdown', () => this.onButtonDown());
    }

    public setMidText(midValue : string) {
        this.tfMid.text = "£" + midValue;
    }

    private onButtonDown() {
        this.emit(RESTART_GAME);
    }
}