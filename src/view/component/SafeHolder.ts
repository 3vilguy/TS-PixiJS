import Safe from '../component/Safe';

export default class SafeHolder extends PIXI.Container {
    private all_safes : Safe[];

    constructor() {
        super();
        this.all_safes = [];
    }

    public createSafes(safeCount : number) {
        for(var i=0; i< safeCount; i++) {
            var safe:Safe = new Safe();
            safe.x = (i + 0.5) * safe.width;
            this.addChild(safe);
            this.all_safes.push(safe);
        }
    }
}