import {from, zip} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {NOTES} from './piano';

export class AudioPlayer {
    constructor () {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext);
        this.gainNode = this.audioCtx.createGain();
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 1024; // change this to more or less triangles
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
        let i, data, total,
            cx, cy,
            r = 50,
            beginAngle = 0,
            angle,
            twoPI = 2 * Math.PI,
            angleGap = twoPI / 3,
            color = 'rgba(115, 226, 36, 0.5)';
        let len = this.analyser.fftSize / 16;
        this.frameLooper = () => {
            window.requestAnimationFrame(this.frameLooper);
            let fbc_array = new Uint8Array(this.analyser.frequencyBinCount);
            this.canvasCtx.save();
            this.analyser.getByteFrequencyData(fbc_array);
            data = fbc_array;
            angle = beginAngle;
            cx = canvasElement.width / 2;
            cy = canvasElement.height / 2;
            this.canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            this.canvasCtx.strokeStyle = color;
            this.canvasCtx.globalCompositeOperation = 'lighter';
            this.canvasCtx.lineWidth = 10;

            total = 0;
            for (i = 8; i < len; i += 2) {
                angle += 0.2;
                this.canvasCtx.beginPath();
                this.canvasCtx.moveTo(cx + data[i] * Math.sin(angle), cy + data[i] * Math.cos(angle));
                this.canvasCtx.lineTo(cx + data[i] * Math.sin(angle + angleGap), cy + data[i] * Math.cos(angle + angleGap));
                this.canvasCtx.lineTo(cx + data[i] * Math.sin(angle + angleGap * 2), cy + data[i] * Math.cos(angle + angleGap * 2));
                this.canvasCtx.closePath();
                this.canvasCtx.stroke();
                total += data[i];
            }
            beginAngle = (beginAngle + 0.00001 * total) % twoPI;
            this.canvasCtx.restore();
        };
        this.frameLooper();
    }

    play (note, offset, duration) {
        let source = this.audioCtx.createBufferSource();
        source.buffer = this.sources[note];
        source.connect(this.analyser);
        this.analyser.connect(this.gainNode);
        this.gainNode.connect(this.audioCtx.destination);
        this.gainNode.gain.value = 1.0;
        this.gainNode.gain.setTargetAtTime(0, this.audioCtx.currentTime + (duration / 4), 0.5);
        source.start(0, offset, duration);
    }
}
