import { Container } from 'pixi.js';

import Safe from './Safe';
import Shuffler from '../../controller/Shuffler';
import { SAFE_CLICKED } from '../../constants/Events';

export default class SafeHolder extends Container {
    private all_safes : Safe[];
    private shuffler : Shuffler;

    constructor() {
        super();

        this.all_safes = [];
        this.shuffler = new Shuffler(this.all_safes);
    }

    public createSafes(safeCount : number) {
        for(var i=0; i< safeCount; i++) {
            var safe:Safe = new Safe(i);
            safe.x = (i + 0.5) * safe.width;
            this.addChild(safe);

            this.all_safes.push(safe);
            safe.on(SAFE_CLICKED, this.handleSafeClicked);
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


    private handleSafeClicked = (safe : Safe) => {
        this.disableAllSafes();
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