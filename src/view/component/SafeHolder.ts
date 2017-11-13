import { TweenLite } from 'gsap';
import { Container } from 'pixi.js';

import Safe from '../component/Safe';
import { SHUFFLE_SPEED } from '../../constants/Config';
import { SAFE_CLICKED } from '../../constants/Events';

export default class SafeHolder extends Container {
    private all_safes : Safe[];
    private shuffleQueue : any[];
    private tweenCount : number;
    private onShuffleComplete : Function;

    constructor() {
        super();
        this.all_safes = [];
        this.tweenCount = 0;
    }

    public createSafes(safeCount : number) {
        for(var i=0; i< safeCount; i++) {
            var safe:Safe = new Safe(i);
            safe.x = (i + 0.5) * safe.width;
            this.addChild(safe);

            this.all_safes.push(safe);
            safe.on(SAFE_CLICKED, (safe : Safe) => this.handleSafeClicked(safe));
        }
    }

    public shuffleSafes(shuffleArray : any[], onShuffleComplete : Function) {
        this.shuffleQueue = shuffleArray;
        this.onShuffleComplete = onShuffleComplete;
        this.shuffle();
    }

    private shuffle() {
        if(this.shuffleQueue.length > 0) {
            this.tweenCount = 0;
            var indexes = this.shuffleQueue.shift();
            var safe1 = this.all_safes[indexes[0]];
            var safe2 = this.all_safes[indexes[1]];
            
            TweenLite.to(safe1, SHUFFLE_SPEED, {x: safe2.x, onComplete: () => this.onTweenComplete()});
            TweenLite.to(safe2, SHUFFLE_SPEED, {x: safe1.x, onComplete: () => this.onTweenComplete()});
        } else {
            // All done
            this.onShuffleComplete();
        }
    }

    private onTweenComplete() {
        this.tweenCount++;
        if(this.tweenCount == 2) {
            // Both done
            this.shuffle();
        }
    }


    public disableAllSafes() {
        this.all_safes.map((safe) => safe.disableClicks());
    }

    public enableClosedSafes() {
        this.all_safes.map((safe) => {
            if(!safe.IS_OPEN) safe.enableClicks();
        });
    }


    public openSafe(safeID : number, showCoin : boolean) {
        this.all_safes[safeID].openSafe(showCoin);
    }


    private handleSafeClicked(safe : Safe) {
        this.disableAllSafes();
        this.emit(SAFE_CLICKED, safe);
    }


    private closeAllSafes() {
        this.all_safes.map((safe) => {
            safe.disableClicks();
            safe.closeSafe();
        });
    }
}