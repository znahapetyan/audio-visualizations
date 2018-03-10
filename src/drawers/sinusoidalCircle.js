import { getRandomColor } from '../helpers';
import { Drawer } from '../drawer';

export class SinusoidalCircle extends Drawer {
    constructor(analyser, view) {
        super(analyser, view);

        this.layer = new PIXI.Container();
        this.view.addChild(this.layer);

        this.sliceCount = 6;
        this.sliceDeg = 2 * Math.PI / this.sliceCount;
    }

    draw = () => {
        this.analyser.getByteTimeDomainData(this.dataArray);

        this.layer.removeChildren();

        let line = new PIXI.Graphics();
        line.lineStyle(2, getRandomColor());

        for (let i = 0; i < this.sliceCount; i++) {
            let startDeg, endDeg;

            if (i % 2 == 0) {
                startDeg = i * this.sliceDeg;
                endDeg = (i + 1) * this.sliceDeg;
            } else {
                startDeg = (i + 1) * this.sliceDeg;
                endDeg = i * this.sliceDeg;
            }

            this.drawCyclic(line, this.dataArray, startDeg, endDeg);
        }

        this.layer.addChild(line);
    }

    drawCyclic(line, data, startDeg, endDeg) {
        const dataLength = data.length;
        const dDeg = (startDeg - endDeg) / dataLength;

        let deg = startDeg;

        for (let i = 0; i < dataLength; i++) {
            const r = 100 + data[i] * .3;
            const x = r * Math.cos(deg);
            const y = r * Math.sin(deg);

            if (i === 0) {
                line.moveTo(x, y);
            } else {
                line.lineTo(x, y);
            }

            deg += dDeg;
        }
    }
}
