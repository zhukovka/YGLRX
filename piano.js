import c from './chords2/1C.mp3';
import db from './chords2/2C#.mp3';
import d from './chords2/3D.mp3';
import eb from './chords2/4D#.mp3';
import e from './chords2/5E.mp3';
import f from './chords2/6F.mp3';
import gb from './chords2/7F#.mp3';
import g from './chords2/8G.mp3';
import ab from './chords2/9G#.mp3';
import a from './chords2/10A.mp3';
import bb from './chords2/11A#.mp3'
import b from './chords2/12B.mp3';

const CHORDS = {
    'C': c,
    'D': d,
    'E': e,
    'F': f,
    'G': g,
    'A': a,
    'B': b
};

export class Piano {
    constructor (...audioElements) {
        this.audioElements = audioElements;
    }

    play (chord, i) {
        this.audioElements[i].src = CHORDS[chord];
        this.audioElements[i].play();
    }
}