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




// Hiermit wissen wir welche Taste gedrückt wurde und stellt diese beim drücken auf "true"
window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    // Rechte Pfeiltaste
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    // Linke Pfeiltaste
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    // Oben Pfeiltaste
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    // Unten Pfeiltaste
    keyboard.DOWN = true;
  }
  if (e.keyCode == 32) {
    // Spacetaste
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    // Rechte Pfeiltaste
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    // Rechte Pfeiltaste
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    // Linke Pfeiltaste
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    // Oben Pfeiltaste
    keyboard.UP = false;
  }
  if (e.keyCode == 40) {
    // Unten Pfeiltaste
    keyboard.DOWN = false;
  }
  if (e.keyCode == 32) {
    // Spacetaste
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    // Rechte Pfeiltaste
    keyboard.D = false;
  }

});

