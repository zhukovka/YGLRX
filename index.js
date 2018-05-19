import {AudioPlayer} from './audioPlayer';
let canvasElement = document.getElementById("canvas");
let audioPlayer = new AudioPlayer();
audioPlayer.visualize(canvasElement);
audioPlayer.loadNotes('G3', 'D_3', 'A_3');
document.addEventListener('click', (e) => {
    setTimeout(() => audioPlayer.play('D_3'), 1150);
    setTimeout(() => audioPlayer.play('G3'), 42);
    setTimeout(() => audioPlayer.play('A_3'), 2300);
    setTimeout(() => audioPlayer.play('G3'), 574);
});

