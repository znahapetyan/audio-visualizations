export class Drawer {
    constructor(analyser, view) {
        this.analyser = analyser;
        this.view = view;

        this.bufferLength = analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
    }

    draw = () => { }
}
