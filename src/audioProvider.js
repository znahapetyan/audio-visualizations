export class AudioProvider {
    static instance;

    constructor() {
        if (AudioProvider.instance) {
            return AudioProvider.instance;
        }

        AudioProvider.instance = this;
    }

    initialize = (file, canvas, Drawer) => {
        this.isPlaying = false;

        this.canvas = canvas;
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
        this.drawer = new Drawer(this.analyser, this.canvas);
    }

    draw = () => {
        if (this.isPlaying) {
            requestAnimationFrame(this.draw);
        }

        this.drawer.draw();
    }
}
