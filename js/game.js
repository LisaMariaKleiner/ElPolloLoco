let canvas;
let world;
let keyboard = new Keyboard();


function startGame() {
  document.getElementById('win').classList.add('d-none');
  document.getElementById('gameOver').classList.add('d-none');
  document.getElementById('mobile_buttons').classList.remove('d-none');
  changeDisplays();
  initLevel();
  init();
}

function changeDisplays() {
  let startscreen = document.getElementById("startscreen");
  let game = document.getElementById("game");
  game.classList.remove("d-none");
  startscreen.classList.add("d-none");
  
}

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function muteToggle() {
  sounds.forEach((element => element.muted = !element.muted))
  document.getElementById('muteButton').blur();  // Fokus entfernen
}

function fullscreen() {
  let fullscreen = document.getElementById('fullscreen');
  openFullscreen(fullscreen);
}

/* Get the documentElement (<html>) to display the page in fullscreen */
let elem = document.getElementById("fullscreen");

/* View in fullscreen */
function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) { /* Safari */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) { /* IE11 */
    element.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}



// Funktion zum Behandeln von Tastatur-Events
function handleKeyboardEvent(e, isPressed) {
  switch (e.keyCode) {
    case 39: // Rechte Pfeiltaste
      keyboard.RIGHT = isPressed;
      break;
    case 37: // Linke Pfeiltaste
      keyboard.LEFT = isPressed;
      break;
    case 38: // Oben Pfeiltaste
      keyboard.UP = isPressed;
      break;
    case 40: // Unten Pfeiltaste
      keyboard.DOWN = isPressed;
      break;
    case 32: // Spacetaste
      keyboard.SPACE = isPressed;
      break;
    case 68: // Taste D
      keyboard.D = isPressed;
      break;
  }
}

// Event-Listener für Tastatur-Down-Ereignisse
window.addEventListener("keydown", (e) => {
  handleKeyboardEvent(e, true);
});

// Event-Listener für Tastatur-Up-Ereignisse
window.addEventListener("keyup", (e) => {
  handleKeyboardEvent(e, false);
});






document.addEventListener("DOMContentLoaded", function () {
function handleTouchEvent(buttonId, isPressed) {
  switch (buttonId) {
    case "run_left":
      keyboard.LEFT = isPressed;
      break;
    case "run_right":
      keyboard.RIGHT = isPressed;
      break;
    case "jump":
      keyboard.SPACE = isPressed;
      break;
    case "throw":
      keyboard.D = isPressed;
      break;
  }
}


document.getElementById("run_left").addEventListener("touchstart", (e) => {
  e.preventDefault();
  handleTouchEvent("run_left", true);
});

document.getElementById("run_right").addEventListener("touchstart", (e) => {
  e.preventDefault();
  handleTouchEvent("run_right", true);
});

document.getElementById("jump").addEventListener("touchstart", (e) => {
  e.preventDefault();
  handleTouchEvent("jump", true);
});

document.getElementById("throw").addEventListener("touchstart", (e) => {
  e.preventDefault();
  handleTouchEvent("throw", true);
});

// Event-Listener für Touch-End-Ereignisse
document.getElementById("run_left").addEventListener("touchend", () => {
  handleTouchEvent("run_left", false);
});

document.getElementById("run_right").addEventListener("touchend", () => {
  handleTouchEvent("run_right", false);
});

document.getElementById("jump").addEventListener("touchend", () => {
  handleTouchEvent("jump", false);
});

document.getElementById("throw").addEventListener("touchend", () => {
  handleTouchEvent("throw", false);
});

});

