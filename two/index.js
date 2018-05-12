import {createAudioContext, createSource, init} from '../triangles';
import {Piano} from '../piano';
import {from, fromEvent, timer, zip} from 'rxjs';
import {concatMap, repeat, take} from 'rxjs/operators/index';

let canvasElement = document.getElementById("canvas");
let audioElement1 = new Audio();
let audioElement2 = new Audio();
let piano = new Piano(audioElement1, audioElement2);
init(canvasElement);
let chords = ['C', 'D'];
// let chords = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
fromEvent(document, 'click')
    .pipe(take(1),
        concatMap(() => {
            createAudioContext();
            createSource(audioElement1);
            createSource(audioElement2);
            return zip(from(chords), timer(2000, 2000), (chord, i) => ({chord, i})).pipe(repeat(2))

        }))
    .subscribe((zip) => {
        piano.play(zip.chord, zip.i % 2);
        return console.log(zip);
    });
