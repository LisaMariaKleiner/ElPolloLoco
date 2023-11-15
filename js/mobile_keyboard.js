
// Das Objekt, das den Tastaturstatus speichert
let mobileButton = {
  RIGHT: false,
  LEFT: false,
  UP: false,
  DOWN: false,
  SPACE: false,
  D: false,
};


// Event-Listener für Button-Down-Ereignisse (Touch)
document.getElementById("run_left").addEventListener("touchstart", (e) => {
  e.preventDefault();
  mobileButton.LEFT = true;
});

document.getElementById("run_left").addEventListener("touchend", (e) => {
  e.preventDefault();
  mobileButton.LEFT = false;
});


document.getElementById("run_right").addEventListener("touchstart", (e) => {
  e.preventDefault();
  mobileButton.RIGHT = true;

});

document.getElementById("run_right").addEventListener("touchend", (e) => {
  e.preventDefault();
  mobileButton.RIGHT = false;
});

document.getElementById("jump").addEventListener("touchstart", (e) => {
  e.preventDefault();
  mobileButton.SPACE = true;
});

document.getElementById("jump").addEventListener("touchend", (e) => {
  e.preventDefault();
  mobileButton.SPACE = false;
});


document.getElementById("throw").addEventListener("touchstart", (e) => {
  e.preventDefault();
  mobileButton.D = true;
});

document.getElementById("throw").addEventListener("touchend", (e) => {
  e.preventDefault();
  mobileButton.D = false;
});



// Event-Listener für kontinuierliche Aktualisierungen (touchmove)
document.getElementById("run_left").addEventListener("touchmove", (e) => {
  e.preventDefault();
});

document.getElementById("run_right").addEventListener("touchmove", (e) => {
  e.preventDefault();
});
