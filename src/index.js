import * as PIXI from 'pixi.js';
import { AudioProvider } from './audioProvider';
import { SinusoidalCircle } from './drawers/sinusoidalCircle';
import { NestedFrequencyCircles } from './drawers/nestedFrequencyCircles';
import { subscribeToFileLoad } from './helpers';

function start(file) {
    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const view = new PIXI.Application({
        view: canvas,
        width: canvas.width,
        height: canvas.height,
        antialias: true,
    });

    const audio = new AudioProvider();
    audio.stop();

    audio.initialize(file, view, SinusoidalCircle).then(() => {
        audio.play();
    });
}

function setup() {
    subscribeToFileLoad(document.getElementById('audio'), start);
}

setup();
