let canvas;
let world;
let keyboard = new Keyboard();

function startGame() {
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


function mutePage() {
  document.querySelectorAll("audio").forEach((elem) => muteMe(elem));
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

  //console.log(e);
});
