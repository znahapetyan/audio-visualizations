import * as PIXI from 'pixi.js';

export class AudioProvider {
    static instance;

    constructor() {
        if (AudioProvider.instance) {
            return AudioProvider.instance;
        }

        AudioProvider.instance = this;
    }

    initialize = (file, view, Drawer) => {
        this.isPlaying = false;

        this.view = view;
        this.context = new AudioContext();
        this.source = this.context.createBufferSource();

        this.analyser = this.context.createAnalyser();
        this.source.connect(this.analyser);

        this.analyser.connect(this.context.destination);

        this.setDrawer(Drawer);

        return new Promise((resolve, reject) => {
            this.context.decodeAudioData(file, buffer => {
                this.source.buffer = buffer;

                resolve(this);
            }, error => {
                reject(error);
            });
        })
    }

    play = () => {
        if (this.isPlaying) {
            return;
        }

        this.source.start();

        this.isPlaying = true;
        this.draw();
    }

    stop = () => {
        if (!this.isPlaying) {
            return;
        }

        this.isPlaying = false;
        this.source.stop();
    }

    setDrawer = (Drawer) => {
        const layer = new PIXI.Container()
        layer.x = this.view.view.width / 2;
        layer.y = this.view.view.height / 2;
        this.view.stage.addChild(layer);

        this.drawer = new Drawer(this.analyser, layer);
    }

    draw = () => {
        if (this.isPlaying) {
            requestAnimationFrame(this.draw);
        }

        this.drawer.draw();
    }
}
