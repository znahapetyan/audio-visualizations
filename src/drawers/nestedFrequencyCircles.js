import { getRandomColor } from '../helpers';
import { Drawer } from '../drawer';

export class NestedFrequencyCircles extends Drawer {
    draw = () => {
        this.analyser.getByteFrequencyData(this.dataArray);

        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;

        this.canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        this.canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
        this.canvasCtx.lineWidth = 2;
        this.canvasCtx.strokeStyle = getRandomColor();
        this.canvasCtx.beginPath();

        const offestX = canvasWidth / 2;
        const offestY = canvasHeight / 2;

        const circleCount = 10;
        const maxRadius = 100;
        const radiusDiff = maxRadius / circleCount;

        for (let i = 0; i < circleCount; i++) {
            let radius = maxRadius - i * radiusDiff + this.dataArray[i];
            radius = radius > 0 ? radius : 0;

            this.canvasCtx.beginPath();
            this.canvasCtx.arc(offestX, offestY, radius, 0, 2 * Math.PI);
            this.canvasCtx.stroke();
        }
    }
}
