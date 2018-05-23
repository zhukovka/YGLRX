import {AudioPlayer} from '../audioPlayer';

const canvasContainer = document.getElementById("canvasContainer");
const codeContainer = document.getElementById("codeContainer");
const codeBlock = document.getElementById("code");

const canvasElement = document.getElementById("canvas");
const audioPlayer = new AudioPlayer();
let currentSlide = 0;

audioPlayer.loadNotes('G3', 'D_3', 'A_3');

const slides = codeContainer.querySelectorAll('pre');

function switchSlide (to) {
    slides[currentSlide].style.display = "none";
    currentSlide = to;
    slides[to].removeAttribute("style");
}

document.addEventListener("keydown", (e) => {
    console.log(e.code);
    if (e.code === "ArrowRight") {
        let to = Math.min(currentSlide + 1, slides.length - 1);
        switchSlide(to);
    }
    if (e.code === "ArrowLeft") {
        let to = Math.max(currentSlide - 1, 0);
        switchSlide(to);
    }

    if (e.code === "Space") {
        codeContainer.style.display = "none";
        canvasContainer.style.display = "block";
        audioPlayer.visualize(canvasElement);
        setTimeout(() => audioPlayer.play('D_3'), 1142);
        setTimeout(() => audioPlayer.play('G3'), 542);
        setTimeout(() => audioPlayer.play('A_3'), 442);
        setTimeout(() => audioPlayer.play('G3'), 342);
    }
    if (e.code === "Enter") {
        open("/one/index.html", "_self");
    }
});


