import {AudioPlayer} from './audioPlayer';
import {CHORDS} from './piano';

let canvasElement = document.getElementById("canvas");
let audioPlayer = new AudioPlayer();

document.addEventListener('click', (e) => {
    audioPlayer.visualize(canvasElement);
    setTimeout(() => audioPlayer.play(CHORDS['C']), Math.random() * 1000 + 1000);
    setTimeout(() => audioPlayer.play(CHORDS['D']), Math.random() * 1000 + 1000);
    setTimeout(() => audioPlayer.play(CHORDS['E']), Math.random() * 1000 + 1000);
    setTimeout(() => audioPlayer.play(CHORDS['F']), Math.random() * 1000 + 1000);
});

