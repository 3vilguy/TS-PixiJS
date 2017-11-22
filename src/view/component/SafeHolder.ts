import { Container } from 'pixi.js';

import Safe from './Safe';
import PepLayer from './PepLayer';
import Shuffler from '../../controller/Shuffler';
import { SAFE_CLICKED } from '../../constants/Events';

export default class SafeHolder extends Container {
    private all_safes : Safe[];
    private shuffler : Shuffler;
    private safeLayer : Container;
    private pepLayer : PepLayer;

    constructor() {
        super();

        this.all_safes = [];
        this.shuffler = new Shuffler(this.all_safes);

        this.safeLayer = new Container();
        this.pepLayer = new PepLayer();
        this.addChild(this.safeLayer);
        this.addChild(this.pepLayer);
    }

    public createSafes(safeCount : number) {
        var offset : number = 0;
        for(var i=0; i< safeCount; i++) {
            var safe:Safe = new Safe(i);
            safe.x = i * 1.2 * safe.width;
            this.safeLayer.addChild(safe);

            this.all_safes.push(safe);
            safe.on(SAFE_CLICKED, this.handleSafeClicked);
            offset = safe.width * 0.5;
        }

        this.safeLayer.x = -this.safeLayer.width * 0.5 + offset;
        this.pepLayer.x = this.safeLayer.x;
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


    private handleSafeClicked = (safe : Safe) => {
        this.disableAllSafes();
        this.pepLayer.showPep(safe.x, safe.y);
        this.emit(SAFE_CLICKED, safe.ID);
    }


    public restart() {
        this.closeAllSafes();
    }

    private closeAllSafes() {
        this.all_safes.map((safe) => {
            safe.disableClicks();
            safe.closeSafe();
        });
    }


    get SHUFFLER() {
        return this.shuffler;
    }
}