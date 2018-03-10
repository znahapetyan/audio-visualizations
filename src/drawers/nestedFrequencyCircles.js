import { getRandomColor } from '../helpers';
import { Drawer } from '../drawer';
import * as PIXI from 'pixi.js';

export class NestedFrequencyCircles extends Drawer {
    constructor(analyser, view) {
        super(analyser, view);

        this.layer = new PIXI.Container();
        this.view.addChild(this.layer);

        this.circleCount = 10;
        this.maxRadius = 100;
        this.radiusDiff = this.maxRadius / this.circleCount;
    }

    draw = () => {
        this.analyser.getByteFrequencyData(this.dataArray);

        this.layer.removeChildren();

        for (let i = 0; i < this.circleCount; i++) {
            let radius = this.maxRadius - i * this.radiusDiff + this.dataArray[i];
            radius = radius > 0 ? radius : 0;

            let circle = new PIXI.Graphics();
            circle.lineStyle(2, getRandomColor());
            circle.drawCircle(0, 0, radius);
            this.layer.addChild(circle);
        }
    }
}
