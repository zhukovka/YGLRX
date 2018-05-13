import {from, fromEvent, timer, zip, interval} from 'rxjs';
import {concatMap, repeat, take, tap, mapTo} from 'rxjs/operators/index';
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

            return from(chords).pipe(concatMap(chord => timer(Math.random() * 1000).pipe(mapTo(chord))));

        }))
    .subscribe((chord) => {
        audioPlayer.play(CHORDS[chord]);
        return console.log(chord);
    });