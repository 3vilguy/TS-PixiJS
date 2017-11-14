import { TweenLite, Linear } from 'gsap';

import MainView from '../view/MainView';
import { INIT_TWEEN_TIME } from '../constants/Config';

export default class GameController {
    private stage:PIXI.Container;
    private mainView:MainView;

    constructor(stage:PIXI.Container) {
        this.stage = stage;
    }

    public init() {
        // Set default Easing for Tweens
        TweenLite.defaultEase = Linear.easeNone;

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
        this.mainView.startShuffling();
    }
}