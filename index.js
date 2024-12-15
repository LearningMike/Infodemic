document.getElementById("player").addEventListener("submit", (event) => {
    event.preventDefault();

    //console.log(JSON.stringify(event.currentTarget.elements));
    const name = document.getElementById("name");
    document.getElementById("intro").style.display = "none";

    const time = performance.timeOrigin + performance.now();
    let pause = true;
    points = 0;
    timeelapsed = (performance.timeOrigin + performance.now()) - time;
});