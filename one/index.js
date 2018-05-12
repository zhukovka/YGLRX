import {initializeVisualizer} from '../visualizer';
import {Piano} from '../piano';
import {Observable, Subject, ReplaySubject, from, of, fromEvent} from 'rxjs';
import {mapTo, mergeAll, concatAll, concatMap, take} from 'rxjs/operators';
import {timer} from "rxjs";

let audioElement = document.getElementById("audio");
let piano = new Piano(audioElement);

fromEvent(document, 'click')
    .pipe(take(1), concatMap(() => {

            initializeVisualizer(document.getElementById("canvas"), audioElement);

            return from([
                timer(1000).pipe(mapTo('C')),
                timer(2000).pipe(mapTo('D')),
                timer(3000).pipe(mapTo('E')),
                timer(4000).pipe(mapTo('F')),
                timer(5000).pipe(mapTo('G')),
                timer(6000).pipe(mapTo('A')),
                timer(7000).pipe(mapTo('B'))
            ]).pipe(mergeAll())
        }
    ))
    .subscribe(chord => {
        console.log(chord);
        // return piano.play(chord);
    });