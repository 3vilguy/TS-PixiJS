import { TweenLite } from 'gsap';
import * as Combinatorics from 'js-combinatorics';
import { DisplayObject } from 'pixi.js';

import { SHUFFLE_SPEED, NUMBER_OF_SHUFFLES } from '../constants/Config';

export default class Shuffler {
    private obj_to_shuffle : DisplayObject[];
    private shuffleQueue : number[][];
    private tweenCount : number;
    private onShuffleComplete : Function | null;

    constructor(obj_to_shuffle : DisplayObject[]) {
        this.obj_to_shuffle = obj_to_shuffle;
    }
    
    public shuffleSafes(onShuffleComplete : Function) {
        this.onShuffleComplete = onShuffleComplete;
        this.generateShuffleData();
        this.shuffle();
    }

    private generateShuffleData() {
        var arr : number[] = [];
        for(var i=0; i< this.obj_to_shuffle.length; i++) {
            arr.push(i);
        }

        var combinations : number[][] = Combinatorics.combination(arr, 2).toArray();
        this.shuffleQueue = [];

        for(var i=0; i< NUMBER_OF_SHUFFLES; i++) {
            var item : number[] = combinations[Math.floor(Math.random()*combinations.length)];
            this.shuffleQueue.push(item);
        }
    }

    private shuffle() {
        if(this.shuffleQueue.length > 0) {
            this.tweenCount = 0;
            var indexes : number[] = this.shuffleQueue[0];
            this.shuffleQueue.shift();  // Just remove 1st element. Can't assing it, because of | undefined
            var obj1 : DisplayObject = this.obj_to_shuffle[indexes[0]];
            var obj2 : DisplayObject = this.obj_to_shuffle[indexes[1]];
            
            TweenLite.to(obj1, SHUFFLE_SPEED, {x: obj2.x, onComplete: this.onTweenComplete});
            TweenLite.to(obj2, SHUFFLE_SPEED, {x: obj1.x, onComplete: this.onTweenComplete});
        } else {
            // All done
            if(this.onShuffleComplete != null) {
                this.onShuffleComplete();
                this.onShuffleComplete = null;
            }
        }
    }

    private onTweenComplete = () => {
        this.tweenCount++;
        if(this.tweenCount == 2) {
            // Both done
            this.shuffle();
        }
    }
}