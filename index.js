const next = document.getElementById("next");
document.addEventListener('keypress', e => {
    console.log('press', e);
    if (e.code === "Enter") {
        open(next.href,"_self");
    }
});
