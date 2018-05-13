import {from, fromEvent, timer, zip} from 'rxjs';
import {concatMap, repeat, take, tap} from 'rxjs/operators/index';
import {CHORDS} from '../piano';
import {AudioPlayer} from '../audioPlayer';

let canvasElement = document.getElementById("canvas");
let audioPlayer = new AudioPlayer();

let chords = ['C', 'D'];
// let chords = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
fromEvent(document, 'click')
    .pipe(take(1),
        concatMap(() => {
            audioPlayer.visualize(canvasElement);

            return zip(from(chords), timer(Math.random() * 1000 + 1000, Math.random() * 1000 + 1000), (chord) => chord).pipe(repeat(2))

        }))
    .subscribe((chord) => {
        audioPlayer.play(CHORDS[chord]);
        return console.log(chord);
    });