import { TweenLite, TimelineLite } from 'gsap';
import { Container, Sprite } from 'pixi.js';

import { PEP_SCALE_TIME, PEP_FADE_OUT_TIME, PEP_FADE_DELAY } from '../../constants/Config';

export default class PepLayer extends Container {
    private last_pep : number;

    constructor() {
        super();

        this.last_pep = 5;
    }

    public showPep(safeX : number, safeY : number) {
        var textureDictionary : PIXI.loaders.TextureDictionary = PIXI.loader.resources[require('../../../assets/images/sprites.json')].textures || {};
        var rnd : number = this.getRandomIntInclusive(0, this.last_pep);

        var pep = new Sprite(
            textureDictionary['pep_' + rnd + '.png']
        );
        pep.x = safeX;
        pep.y = safeY - 50;
        pep.anchor.set(0.5, 0.5);
        pep.scale.x = 0;
        pep.scale.y = 0;
        this.addChild(pep);

        var tl = new TimelineLite({onComplete: () => this.removeChild(pep)});
        tl.add( TweenLite.to(pep.scale, PEP_SCALE_TIME, {x: 1, y: 1}) );
        tl.add( TweenLite.to(pep, PEP_FADE_OUT_TIME, {y: pep.y - 100, alpha: 0, delay: PEP_FADE_DELAY}) );
    }

    private getRandomIntInclusive(min : number, max : number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}