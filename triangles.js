//Canvas
let canvas, canvasCtx;
// Define variables for analyser
let audioContext, analyser, fbc_array, data, len, total;

export function createSource (audio) {
    let source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
}

// Define Audio Analyser Helpers
export function createAudioContext () {
    audioContext = new (window.AudioContext || window.webkitAudioContext);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 1024; // change this to more or less triangles
    len = analyser.fftSize / 16;
    frameLooper();
}

// Define math info for draw
let i,
    cx, cy,
    r = 50,
    beginAngle = 0,
    angle,
    twoPI = 2 * Math.PI,
    angleGap = twoPI / 3,
    color = 'rgba(115, 226, 36, 0.5)';

// Create the animation
function frameLooper () {
    window.requestAnimationFrame(frameLooper);
    fbc_array = new Uint8Array(analyser.frequencyBinCount);
    canvasCtx.save();
    analyser.getByteFrequencyData(fbc_array);
    data = fbc_array;
    angle = beginAngle;
    cx = canvas.width / 2;
    cy = canvas.height / 2;
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.strokeStyle = color;
    canvasCtx.globalCompositeOperation = 'lighter';
    canvasCtx.lineWidth = 10;

    total = 0;
    for (i = 8; i < len; i += 2) {
        angle += 0.2;
        canvasCtx.beginPath();
        canvasCtx.moveTo(cx + data[i] * Math.sin(angle), cy + data[i] * Math.cos(angle));
        canvasCtx.lineTo(cx + data[i] * Math.sin(angle + angleGap), cy + data[i] * Math.cos(angle + angleGap));
        canvasCtx.lineTo(cx + data[i] * Math.sin(angle + angleGap * 2), cy + data[i] * Math.cos(angle + angleGap * 2));
        canvasCtx.closePath();
        canvasCtx.stroke();
        total += data[i];
    }
    beginAngle = (beginAngle + 0.00001 * total) % twoPI;
    canvasCtx.restore();
}

// call the magic =D
export function init (canvasElement) {
    canvas = canvasElement;
    canvasCtx = canvas.getContext('2d');
    canvasElement.width = canvasElement.offsetWidth;
    canvasElement.height = canvasElement.offsetHeight;
}

// label();
// addLabel(chord);
// var _chord = '';
// var ctx = canvasElement.getContext("2d");
// var labels = [];
// let y = 100;
// let color = 'rgba(115, 226, 36, 0.5)';
//
// function addLabel (text) {
//     let width = canvasElement.offsetWidth;
//     console.log(width);
//     labels.push({text, y: 100, x: Math.random() * width});
// }
//
// function label () {
//     window.requestAnimationFrame(label);
//
//     ctx.save();
//     ctx.fillStyle = color;
//     ctx.font = "60px Averia Serif Libre";
//     for (let i = 0; i < labels.length; i++) {
//         let l = labels[i];
//         ctx.fillText(l.text, l.x, l.y);
//         l.y += 5;
//     }
//
//     ctx.restore();
// }