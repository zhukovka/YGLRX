import {AudioPlayer} from '../audioPlayer';

let canvasElement = document.getElementById("canvas");
let audioPlayer = new AudioPlayer();
const timeUnit = 1000;
audioPlayer.visualize(canvasElement);
audioPlayer.loadNotes('G3', 'D_3');
document.addEventListener('click', (e) => {

    setTimeout(() => {

        audioPlayer.play('G3', 0, 1/2);

        setTimeout(() => {

            audioPlayer.play('G3', 0, 1/2);
            setTimeout(() => {

                audioPlayer.play('G3', 0, 1/2);
                setTimeout(() => {

                    audioPlayer.play('D_3', 0, 1/2);
                }, timeUnit);
            }, timeUnit);
        }, timeUnit);
    }, timeUnit);
});