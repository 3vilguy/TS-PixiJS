import { TweenLite } from 'gsap';
import * as Combinatorics from 'js-combinatorics';
import { Container, Sprite } from 'pixi.js';

import SafeHolder from './component/SafeHolder';
import { INIT_TWEEN_TIME, SAFE_COUNT, NUMBER_OF_SHUFFLES } from '../constants/Config';
import { WIDTH, HEIGHT } from '../constants/RendererConstants';

export default class MainView extends Container {
    private safeHolder : SafeHolder;
    private footerText : PIXI.extras.BitmapText;

    public init() {
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
    }

    private addText() {
        this.footerText = new PIXI.extras.BitmapText('HELLO...', { font: '35px message_simple-export'});
        this.footerText.anchor = new PIXI.Point(0.5);
        this.footerText.x = WIDTH * 0.5;
        this.footerText.y = HEIGHT - this.footerText.height;

        this.addChild(this.footerText);
    }


    private showInitTween() {
        TweenLite.to(this, INIT_TWEEN_TIME, {alpha: 1, onComplete: () => this.onTweenComplete()})
    }

    private onTweenComplete() {
        console.log("onTweenComplete");
        this.startShuffling();
    }


    private startShuffling() {
        this.footerText.text = "SHUFFLING...";

        // Shuffle data:
        var arr = []
        for(var i=0; i< SAFE_COUNT; i++) {
            arr.push(i);
        }

        var combinations = Combinatorics.combination(arr, 2).toArray();
        var shuffleArray = [];

        for(var i=0; i< NUMBER_OF_SHUFFLES; i++) {
            var item = combinations[Math.floor(Math.random()*combinations.length)];
            shuffleArray.push(item);
        }

        this.safeHolder.shuffleSafes(shuffleArray, () => this.onShuffleComplete());
    }

    private onShuffleComplete() {
        console.log("onShuffleComplete");
    }
}