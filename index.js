import {initializeVisualizer} from './visualizer';
import {Piano} from './piano';

let audioElement = document.getElementById("audio");
document.addEventListener('keypress', (e) => {
    if (e.code === 'Space') {
        initializeVisualizer(document.getElementById("canvas"), audioElement);
        let piano = new Piano(audioElement);
        setTimeout(() => piano.play('C'), 1000);
        // setTimeout(() => piano.play('D'), 2000);
        // setTimeout(() => piano.play('E'), 3000);
        // setTimeout(() => piano.play('F'), 4000);
        // setTimeout(() => piano.play('G'), 5000);
        // setTimeout(() => piano.play('A'), 6000);
        // setTimeout(() => piano.play('B'), 7000);
    }
});

