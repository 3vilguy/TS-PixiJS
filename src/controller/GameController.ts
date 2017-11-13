import { TweenLite, Linear } from 'gsap';

import MainView from '../view/MainView';

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
        this.stage.addChild(this.mainView);
    }
}