import {initializeVisualizer} from '../visualizer';
import {Piano} from '../piano';
import {from, fromEvent, zip, timer, of} from 'rxjs';
import {startWith} from 'rxjs/operators';
import {concatMap, take, repeat} from 'rxjs/operators/index';

let audioElement = document.getElementById("audio");
let piano = new Piano(audioElement);
let chords = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
fromEvent(document, 'click')
    .pipe(take(1),
        concatMap(() => {
            initializeVisualizer(document.getElementById("canvas"), audioElement);

            return zip(from(chords), timer(500, 500), (chord) => chord).pipe(repeat(2))

        }))
    .subscribe((chord) => {
        piano.play(chord);
        return console.log(chord);
    });
