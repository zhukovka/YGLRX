document.addEventListener('keypress', e => {
    console.log('press', e);
    if (e.code === "Enter") {
        open("/intro/index.html","_self");
    }
});
