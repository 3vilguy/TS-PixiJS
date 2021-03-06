import { Container, Sprite, Point } from 'pixi.js';

import SafeHolder from './component/SafeHolder';
import Panel from './component/Panel';
import { SAFE_COUNT } from '../constants/Config';
import { WIDTH, HEIGHT } from '../constants/RendererConstants';

export default class MainView extends Container {
    private safeHolder : SafeHolder;
    private footerText : PIXI.extras.BitmapText;
    private panel : Panel;

    public init() {
        this.addLogo();
        this.addSafeHolder();
        this.addText();
        this.addPanel();
    }

    private addLogo() {
        var textureDictionary : PIXI.loaders.TextureDictionary = PIXI.loader.resources[require('../../assets/images/sprites.json')].textures || {};

        var sprite = new Sprite(
            textureDictionary['LOGO.png']
        );
        sprite.anchor.x = 0.5;
        sprite.x = WIDTH * 0.5;
        this.addChild(sprite);
    }

    private addSafeHolder() {
        this.safeHolder = new SafeHolder();
        this.safeHolder.createSafes(SAFE_COUNT);
        this.safeHolder.x = WIDTH * 0.5;
        this.safeHolder.y = HEIGHT * 0.6;
        this.addChild(this.safeHolder);
    }

    private addText() {
        this.footerText = new PIXI.extras.BitmapText('HELLO...', { font: '35px message_simple-export'});
        this.footerText.anchor = new Point(0.5);
        this.footerText.x = WIDTH * 0.5;
        this.footerText.y = HEIGHT - this.footerText.height;

        this.addChild(this.footerText);
    }

    private addPanel() {
        this.panel = new Panel();
        this.panel.x = WIDTH * 0.5;
        this.panel.y = HEIGHT * 0.6;
        this.addChild(this.panel);
        this.panel.visible = false;
    }


    public prepareForShuffling() {
        this.footerText.text = "SHUFFLING...";
        this.safeHolder.disableAllSafes();
    }


    public prepareForPicking() {
        this.footerText.text = "PICK A SAFE...";
        this.safeHolder.enableClosedSafes();
    }

    public prepareRemainingPicks() {
        this.footerText.text = "PICK ANOTHER SAFE...";
        this.safeHolder.enableClosedSafes();
    }

    public showWin(winAmount : string) {
        this.footerText.text = "WE HAVE A WINRAR!";
        this.panel.setMidText(winAmount);
        this.panel.visible = true;
    }

    public restart() {
        this.safeHolder.restart();
        this.panel.visible = false;
    }


    public clearFooter() {
        this.footerText.text = "";
    }


    get SAFE_HOLDER() {
        return this.safeHolder;
    }

    get WIN_PANEL() {
        return this.panel;
    }
}