import {AudioPlayer} from '../audioPlayer.js';

import {from, fromEvent, timer, zip} from 'rxjs';
import {concatMap, mapTo} from 'rxjs/operators';

let canvasElement = document.getElementById("canvas");
let audioPlayer = new AudioPlayer();
audioPlayer.visualize(canvasElement);
audioPlayer.loadNotes('G3', 'D_3', 'A_3');
let beat = 500;
let q = beat / 8;
const c = beat / 2;
const march = ['G3', 'G3', 'G3', 'D_3', 'A_3', 'G3', 'D_3', 'A_3', 'G3'];
const duration = [c, c, c, c, q, c, c, q, beat];
const length = [0, beat, beat, beat, 2 * beat / 3, beat / 4, beat, 2 * beat / 3, beat / 4, 0];

fromEvent(document, 'click')
    .pipe(
        concatMap(() => {
            let march$ = from(march);
            let duration$ = from(duration);
            let length$ = from(length);
            return zip(march$, duration$, length$.pipe(concatMap(ms => {
                return timer(ms);
            })));
        }))
    .subscribe((zipped) => {
        let [note, ms] = zipped;
        audioPlayer.play(note, 0, ms / 1000);
    });