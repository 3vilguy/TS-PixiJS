import { TweenLite } from 'gsap';

import Safe from './component/Safe';
import { WIDTH, HEIGHT } from '../constants/RendererConstants';

export default class MainView extends PIXI.Container {
    private safeCount : number;
    private totalShuffles : number;

    public init() {
        this.alpha = 0;

        this.addGraphic();
        this.showInitTween();
    }


    private addGraphic() {
        this.addLogo();
        this.addSafes();
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

    private addSafes() {
        var container = new PIXI.Container();
        for(var i=0; i< this.safeCount; i++) {
            var safe:Safe = new Safe();
            safe.x = (i + 0.5) * safe.width;
            container.addChild(safe);
        }

        container.x = (WIDTH - container.width) * 0.5;
        container.y = HEIGHT * 0.5;
        this.addChild(container);
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