import { TweenLite, Linear } from 'gsap';

import MainView from '../view/MainView';
import { INIT_TWEEN_TIME, SAFE_COUNT, DELAY_BETWEEN_PICKS, DELAY_AFTER_ALL_PICKS } from '../constants/Config';
import { SAFE_CLICKED, RESTART_GAME } from '../constants/Events';

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
        TweenLite.to(this.mainView, INIT_TWEEN_TIME, {alpha: 1, onComplete: this.onTweenComplete})
    }

    private onTweenComplete = () => {
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
        var delay;
        if(this.safeClicked == SAFE_COUNT) {
            handler = this.handleAllPicked;
            delay = DELAY_AFTER_ALL_PICKS;
        } else {
            handler = this.handleRemainingPicks;
            delay = DELAY_BETWEEN_PICKS;
        }

        TweenLite.delayedCall(delay, handler);
    }

    private handleRemainingPicks = () => {
        this.mainView.prepareRemainingPicks();
    }

    private handleAllPicked = () => {
        this.mainView.SAFE_HOLDER.off(SAFE_CLICKED, this.handleSafeClicked);
        this.showReward();
    }

    private showReward() {
        this.mainView.WIN_PANEL.on(RESTART_GAME, this.handleRestartGame);

        var awards : string[] = ['3', '10', '1,000'];
        var winAmount : string = awards[Math.floor(Math.random()*awards.length)];
        this.mainView.showWin(winAmount);
    }

    private handleRestartGame = () => {
        this.mainView.WIN_PANEL.off(RESTART_GAME, this.handleRestartGame);
        this.safeClicked = 0;
        this.mainView.restart();

        this.startShuffling();
    }
}