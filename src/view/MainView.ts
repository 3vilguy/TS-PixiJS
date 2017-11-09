import Safe from './component/Safe';
import { WIDTH, HEIGHT } from '../constants/RendererConstants';

export default class MainView extends PIXI.Container {
    public init() {
        this.addLogo();
        this.addSafes();
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
        for(var i=0; i< 3; i++) {
            var safe:Safe = new Safe();
            safe.x = (i + 0.5) * safe.width;
            container.addChild(safe);
        }

        container.x = (WIDTH - container.width) * 0.5;
        container.y = HEIGHT * 0.5;
        this.addChild(container);
    }
}