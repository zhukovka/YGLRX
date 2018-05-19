import {AudioPlayer} from '../audioPlayer.js';

import {from, fromEvent, timer, zip} from 'rxjs';
import {concatMap} from 'rxjs/operators';

const canvasElement = document.getElementById("canvas");
const audioPlayer = new AudioPlayer();
audioPlayer.visualize(canvasElement);
audioPlayer.loadNotes('G3', 'D_3', 'A_3');
const one = 500;
const one2 = one / 2;
const one4 = one / 4;
const one8 = one / 8;
const two3 = 2 * one / 3;
const march = ['G3', 'G3', 'G3', 'D_3', 'A_3', 'G3', 'D_3', 'A_3', 'G3'];
const duration = [one2, one2, one2, one2, one8, one2, one2, one8, one];
const length = [0, one, one, one, two3, one4, one, two3, one4, 0];
const march$ = from(march);
const duration$ = from(duration);
const length$ = from(length);
const midi$ = zip(march$, duration$, length$.pipe(concatMap(ms => timer(ms))));

fromEvent(document, 'click')
    .pipe(concatMap(() => midi$))
    .subscribe((zipped) => {
        let [note, ms] = zipped;
        audioPlayer.play(note, 0, ms / 1000);
    });