import {AudioPlayer} from './audioPlayer';
import {NOTES} from './piano';

let canvasElement = document.getElementById("canvas");
let audioPlayer = new AudioPlayer();

document.addEventListener('click', (e) => {
    audioPlayer.visualize(canvasElement);
    setTimeout(() => audioPlayer.play(NOTES['D_3']), 1150);
    setTimeout(() => audioPlayer.play(NOTES['G3']), 42);
    setTimeout(() => audioPlayer.play(NOTES['A_3']), 2300);
    setTimeout(() => audioPlayer.play(NOTES['G3']), 574);
});

