import {createAudioContext, createSource, init} from './triangles';
import {from, fromEvent, zip, timer, of} from 'rxjs';
import {switchMap, concatMap, flatMap, map} from 'rxjs/operators';
import {NOTES} from './piano';

export class AudioPlayer {
    constructor () {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext);
        this.gainNode = this.audioCtx.createGain();
        this.sources = {};
    }

    loadNotes (...notes) {
        let source = from(notes);
        zip(source, source
            .pipe(map(note => NOTES[note]),
                flatMap(url =>
                    fetch(url)
                        .then(resp => resp.arrayBuffer()
                            .then(buffer => this.audioCtx.decodeAudioData(buffer))))
            ))
            .subscribe(resp => {
                this.sources[resp[0]] = resp[1];
            });
    }

    visualize (canvasElement) {
        this.canvasCtx = canvasElement.getContext('2d');
        canvasElement.width = canvasElement.offsetWidth;
        canvasElement.height = canvasElement.offsetHeight;
    }

    play (note, offset, duration) {
        let source = this.audioCtx.createBufferSource();
        source.buffer = this.sources[note];
        source.connect(this.gainNode);
        this.gainNode.connect(this.audioCtx.destination);
        this.gainNode.start(0, offset, duration);
    }
}
