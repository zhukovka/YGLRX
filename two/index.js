import {AudioPlayer} from '../audioPlayer.js';

import {from, fromEvent, interval, zip} from 'rxjs';
import {concatMap} from 'rxjs/operators';

let canvasElement = document.getElementById("canvas");
let audioPlayer = new AudioPlayer();
audioPlayer.visualize(canvasElement);
audioPlayer.loadNotes('G3', 'D_3', 'A_3');
let beat = 500;
let q = beat / 8;
const c = beat / 2;
const march = ['G3', 'G3', 'G3', 'D_3', 'A_3', 'G3', 'D_3', 'A_3', 'G3'];
const time = [c, c, c, c, q, c, c, q, beat];
// const march = ['A_3'];
// const time = [q];

fromEvent(document, 'click')
    .pipe(
        concatMap(() => {
            let march$ = from(march);
            let time$ = from(time);
            console.log("kuku");
            return zip(march$, time$, interval(beat));
        }))
    .subscribe((zipped) => {
        let [note, ms] = zipped;
        audioPlayer.play(note, 0, ms / 1000);
    });