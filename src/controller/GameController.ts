import { TweenLite, Linear } from 'gsap';

import MainView from '../view/MainView';
import { INIT_TWEEN_TIME, SAFE_COUNT, TIME_BETWEEN_PICKS } from '../constants/Config';
import { SAFE_CLICKED } from '../constants/Events';

export default class GameController {
    private stage : PIXI.Container;
    private mainView : MainView;
    private safeClicked : number;

    constructor(stage:PIXI.Container) {
        this.stage = stage;
    }

    public init() {
        // Set default Easing for Tweens
        TweenLite.defaultEase = Linear.easeNone;

        this.safeClicked = 0;

        // Init main view
        this.mainView = new MainView();
        this.mainView.init();
        this.mainView.alpha = 0;
        this.stage.addChild(this.mainView);

        this.showInitTween();
    }


    private showInitTween() {
        TweenLite.to(this.mainView, INIT_TWEEN_TIME, {alpha: 1, onComplete: () => this.onTweenComplete()})
    }

    private onTweenComplete() {
        this.startShuffling();
    }


    private startShuffling() {
        this.mainView.prepareForShuffling();
        this.mainView.SAFE_HOLDER.SHUFFLER.shuffleSafes(this.onShuffleComplete);
    }

    private onShuffleComplete = () => {
        this.startPicking();
    }


    private startPicking() {
        this.mainView.prepareForPicking();
        this.mainView.SAFE_HOLDER.on(SAFE_CLICKED, this.handleSafeClicked);
    }

    private handleSafeClicked = (safeID : number) => {
        this.mainView.clearFooter();
        this.safeClicked++;

        var showCoin : boolean = Math.random() >= 0.5;
        this.mainView.SAFE_HOLDER.openSafe(safeID, showCoin);

        var handler;
        if(this.safeClicked == SAFE_COUNT) {
            handler = this.handleAllPicked;
        } else {
            handler = this.handleRemainingPicks;
        }

        TweenLite.delayedCall(TIME_BETWEEN_PICKS, handler);
    }

    private handleRemainingPicks = () => {
        this.mainView.prepareRemainingPicks();
    }

    private handleAllPicked = () => {
        this.showReward();
    }


    private showReward() {
        var awards : string[] = ['3', '10', '1,000'];
        var winAmount : string = awards[Math.floor(Math.random()*awards.length)];
        this.mainView.showWin(winAmount);
    }
}