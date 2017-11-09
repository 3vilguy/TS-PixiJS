import { WIDTH, HEIGHT } from '../constants/RendererConstants';

export default class MainView extends PIXI.Container {
    public init() {
        var graph = new PIXI.Graphics();
        graph.beginFill(0xFF0000);
        graph.drawRect(0, 0, 100, 100);
        graph.endFill();
        this.addChild(graph);
        graph.x = WIDTH * 0.5;
        graph.y = HEIGHT * 0.5;
    }
}