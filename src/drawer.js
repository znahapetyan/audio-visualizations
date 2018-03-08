export class Drawer {
    constructor(analyser, canvas) {
        this.analyser = analyser;
        this.canvas = canvas;
        this.canvasCtx = canvas.getContext('2d');

        this.bufferLength = analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
    }

    draw = () => { }
}
