import { AudioProvider } from './audioProvider';
import { SinusoidalCircle } from './drawers/sinusoidalCircle';
import { subscribeToFileLoad } from './helpers';

function start(file) {
    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const canvasCtx = canvas.getContext('2d');
    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    const audio = new AudioProvider();
    audio.stop();

    audio.initialize(file, canvas, SinusoidalCircle).then(() => {
        audio.play();
    });
}

subscribeToFileLoad(document.getElementById('audio'), start);
