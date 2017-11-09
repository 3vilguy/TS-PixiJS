import { TweenLite } from 'gsap';

import SafeHolder from './component/SafeHolder';
import { WIDTH, HEIGHT } from '../constants/RendererConstants';

export default class MainView extends PIXI.Container {
    private safeHolder : SafeHolder;
    private safeCount : number;
    private totalShuffles : number;

    public init() {
        this.safeCount = 3;
        this.alpha = 0;

        this.addGraphic();
        this.showInitTween();
    }


    private addGraphic() {
        this.addLogo();
        this.addSafeHolder();
        this.addText();
    }

    private addLogo() {
        var sprite = new PIXI.Sprite(
            PIXI.loader.resources[require('../../assets/images/LOGO.png')].texture
        );
        sprite.anchor.x = 0.5;
        sprite.x = WIDTH * 0.5;
        this.addChild(sprite);
    }

    private addSafeHolder() {
        this.safeHolder = new SafeHolder();
        this.safeHolder.createSafes(this.safeCount);
        this.safeHolder.x = (WIDTH - this.safeHolder.width) * 0.5;
        this.safeHolder.y = HEIGHT * 0.5;
        this.addChild(this.safeHolder);
    }

    private addText() {
        var bitmapFontText = new PIXI.extras.BitmapText('HELLO...', { font: '35px message_simple-export'});
        bitmapFontText.anchor = new PIXI.Point(0.5);
        bitmapFontText.x = WIDTH * 0.5;
        bitmapFontText.y = HEIGHT - bitmapFontText.height;

        this.addChild(bitmapFontText);
    }


    private showInitTween() {
        TweenLite.to(this, 2, {alpha: 1, onComplete: this.onTweenComplete})
    }

    private onTweenComplete() {
        console.log("onTweenComplete");
    }
}