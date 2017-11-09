import { TweenLite } from 'gsap';
import * as Combinatorics from 'js-combinatorics';

import SafeHolder from './component/SafeHolder';
import { WIDTH, HEIGHT } from '../constants/RendererConstants';

export default class MainView extends PIXI.Container {
    private safeHolder : SafeHolder;
    private footerText : PIXI.extras.BitmapText;
    private safeCount : number;
    private totalShuffles : number;

    public init() {
        this.safeCount = 3;
        this.totalShuffles = 5;
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
        this.footerText = new PIXI.extras.BitmapText('HELLO...', { font: '35px message_simple-export'});
        this.footerText.anchor = new PIXI.Point(0.5);
        this.footerText.x = WIDTH * 0.5;
        this.footerText.y = HEIGHT - this.footerText.height;

        this.addChild(this.footerText);
    }


    private showInitTween() {
        TweenLite.to(this, 2, {alpha: 1, onComplete: () => this.onTweenComplete()})
    }

    private onTweenComplete() {
        console.log("onTweenComplete");
        this.startShuffling();
    }


    private startShuffling() {
        this.footerText.text = "SHUFFLING...";

        // Shuffle data:
        var arr = []
        for(var i=0; i< this.safeCount; i++) {
            arr.push(i);
        }

        var combinations = Combinatorics.combination(arr, 2).toArray();
        var shuffleArray = [];

        for(var i=0; i< this.totalShuffles; i++) {
            var item = combinations[Math.floor(Math.random()*combinations.length)];
            shuffleArray.push(item);
        }

        this.safeHolder.shuffleSafes(shuffleArray, this.onShuffleComplete);
    }

    private onShuffleComplete() {
        console.log("onShuffleComplete");
    }
}