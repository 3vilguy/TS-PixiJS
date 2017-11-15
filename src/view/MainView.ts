import { TweenLite } from 'gsap';
import { Container, Sprite } from 'pixi.js';

import Safe from './component/Safe';
import SafeHolder from './component/SafeHolder';
import Panel from './component/Panel';
import { SAFE_COUNT, TIME_BETWEEN_PICKS } from '../constants/Config';
import { WIDTH, HEIGHT } from '../constants/RendererConstants';
import { SAFE_CLICKED, RESTART_GAME } from '../constants/Events';

export default class MainView extends Container {
    private safeHolder : SafeHolder;
    private footerText : PIXI.extras.BitmapText;
    private panel : Panel;
    private safeClicked : number;

    public init() {
        this.safeClicked = 0;

        this.addLogo();
        this.addSafeHolder();
        this.addText();
        this.addPanel();
    }

    private addLogo() {
        var sprite = new Sprite(
            PIXI.loader.resources[require('../../assets/images/LOGO.png')].texture
        );
        sprite.anchor.x = 0.5;
        sprite.x = WIDTH * 0.5;
        this.addChild(sprite);
    }

    private addSafeHolder() {
        this.safeHolder = new SafeHolder();
        this.safeHolder.createSafes(SAFE_COUNT);
        this.safeHolder.x = (WIDTH - this.safeHolder.width) * 0.5;
        this.safeHolder.y = HEIGHT * 0.6;
        this.addChild(this.safeHolder);
        this.safeHolder.on(SAFE_CLICKED, (safe : Safe) => this.handleSafeClicked(safe));
    }

    private addText() {
        this.footerText = new PIXI.extras.BitmapText('HELLO...', { font: '35px message_simple-export'});
        this.footerText.anchor = new PIXI.Point(0.5);
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
        this.panel.on(RESTART_GAME, () => this.handleRestartGame());
    }


    public prepareForShuffling() {
        this.footerText.text = "SHUFFLING...";
        this.safeHolder.disableAllSafes();
    }


    public startPicking() {
        this.safeHolder.enableClosedSafes();
        this.footerText.text = "PICK A SAFE...";
    }

    private handleSafeClicked(safe : Safe) {
        this.footerText.text = "";
        this.safeClicked++;

        var showCoin : boolean = Math.random() >= 0.5;
        this.safeHolder.openSafe(safe.ID, showCoin);

        if(this.safeClicked == SAFE_COUNT) {
            // All opened
            TweenLite.delayedCall(TIME_BETWEEN_PICKS, () => this.handleAllSafePicked())
        } else {
            TweenLite.delayedCall(TIME_BETWEEN_PICKS, () => this.startRemainingPicks())
        }
    }

    private startRemainingPicks() {
        this.footerText.text = "PICK ANOTHER SAFE...";
        this.safeHolder.enableClosedSafes();
    }

    private handleAllSafePicked() {
        var tmp : string[] = ['3', '10', '1,000'];
        this.footerText.text = "WE HAVE A WINRAR!";
        this.panel.setMidText(tmp[Math.floor(Math.random()*tmp.length)]);
        this.panel.visible = true;
    }

    private handleRestartGame() {
        this.safeClicked = 0;

        this.safeHolder.restart();
        this.panel.visible = false;
    }


    get SAFE_HOLDER() {
        return this.safeHolder;
    }
}