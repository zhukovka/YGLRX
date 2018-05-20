document.addEventListener('keypress', e => {
    console.log('press', e);
    if (e.code === "Enter") {
        open("/zero/index.html","_self");
    }
});
