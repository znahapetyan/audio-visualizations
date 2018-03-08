import { getRandomColor } from '../helpers';

export class SinusoidalCircle {
    constructor(analyser, canvas) {
        this.analyser = analyser;
        this.canvas = canvas;
        this.canvasCtx = canvas.getContext('2d');

        this.bufferLength = analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
    }

    draw = () => {
        this.analyser.getByteTimeDomainData(this.dataArray);

        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;

        this.canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        this.canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
        this.canvasCtx.lineWidth = 2;
        this.canvasCtx.strokeStyle = getRandomColor();
        this.canvasCtx.beginPath();

        const offestX = canvasWidth / 2;
        const offestY = canvasHeight / 2;

        const sliceCount = 6;
        const sliceDeg = 2 * Math.PI / sliceCount;

        for (let i = 0; i < sliceCount; i++) {
            let startDeg, endDeg;

            if (i % 2 == 0) {
                startDeg = i * sliceDeg;
                endDeg = (i + 1) * sliceDeg;
            } else {
                startDeg = (i + 1) * sliceDeg;
                endDeg = i * sliceDeg;
            }

            this.drawCyclic(this.canvasCtx, this.dataArray, offestX, offestY, startDeg, endDeg);
        }

        this.canvasCtx.stroke();
    }

    drawCyclic(canvasCtx, data, offestX, offestY, startDeg, endDeg) {
        const dataLength = data.length;
        const dDeg = (startDeg - endDeg) / dataLength;

        let deg = startDeg;

        for (let i = 0; i < dataLength; i++) {
            const r = 100 + data[i] * .3;
            const x = offestX + r * Math.cos(deg);
            const y = offestY + r * Math.sin(deg);

            if (i === 0) {
                canvasCtx.moveTo(x, y);
            } else {
                canvasCtx.lineTo(x, y);
            }

            deg += dDeg;
        }
    }
}
