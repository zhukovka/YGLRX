import {createAudioContext, createSource, init} from './triangles';

export class AudioPlayer {
    constructor () {
        this.audioElements = [];
        this.audioElements.push(new Audio());
        this.audioElements.push(new Audio());
        this.currentAudio = -1;
    }

    visualize (canvasElement) {
        init(canvasElement);
        createAudioContext();
        for (let audio of this.audioElements) {
            createSource(audio);
        }
    }

    play (src) {
        this.currentAudio = (this.currentAudio + 1) % this.audioElements.length;
        this.audioElements[this.currentAudio].src = src;
        this.audioElements[this.currentAudio].play();
    }
}
