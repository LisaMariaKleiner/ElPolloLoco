let canvas;
let world;
let keyboard = new Keyboard();
let elem = document.getElementById("fullscreen");


/**
 * The main function to start the game.
 * Initializes the game and changes the display.
 */
function startGame() {
  document.getElementById("win").classList.add("d-none");
  document.getElementById("gameOver").classList.add("d-none");
  document.getElementById("mobile_buttons").classList.remove("d-none");
  changeDisplays();
  initLevel();
  init();
}

function stopAllIntervall(params) {
  for (let index = 0; index < 1000; index++) {
    clearInterval(index);
  }
}


/**
 * Changes the displays between the start screen and the game.
 */
function changeDisplays() {
  let startscreen = document.getElementById("startscreen");
  let game = document.getElementById("game");
  game.classList.remove("d-none");
  startscreen.classList.add("d-none");
}


/**
 * Initializes the game and the canvas element.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}


/**
 * Toggles the sound on or off and updates the speaker icon accordingly.
 */
function muteToggle() {
  var speakerIcon = document.getElementById("speakerIcon");
  var isMuted = sounds[0].muted;
  sounds.forEach((element) => (element.muted = !isMuted));
  speakerIcon.parentElement.classList.toggle("muted", !isMuted);
  document.getElementById("muteButton").blur();
}


/**
 * Toggles the sound on mobile devices and updates the icon accordingly.
 */
function muteToggleMobile() {
  var speakerIcon = document.getElementById("speakerIconMobile");
  var isMuted = sounds[0].muted;
  sounds.forEach((element) => (element.muted = !isMuted));
  speakerIcon.parentElement.classList.toggle("muted", !isMuted);
  document.getElementById("muteButtonMobile").blur();
}


/**
 * Toggles between game instructions and the start screen.
 */
function toggleDirections() {
  let directions = document.getElementById("description");
  let startscreen = document.getElementById("startscreen");
  if (directions && startscreen) {
    startscreen.classList.toggle("d-none");
    directions.classList.toggle("d-none");
  }
}


/**
 * Opens the game in fullscreen mode.
 */
function fullscreen() {
  let canvas = document.getElementById("canvas"); // Hier Canvas-Element referenzieren
  let fullscreenButton = document.getElementById("fullscreen");

  if (fullscreenButton.classList.contains("fullscreen")) {
    // Wenn im Vollbildmodus, dann den Vollbildmodus beenden
    exitFullscreen();
  } else {
    // Andernfalls in den Vollbildmodus wechseln
    openFullscreen(canvas);
  }
}

function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

document.addEventListener("fullscreenchange", handleFullscreenChange);
document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
document.addEventListener("msfullscreenchange", handleFullscreenChange);

function handleFullscreenChange() {
  let fullscreenButton = document.getElementById("fullscreen");

  if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
    // Canvas-Größe aktualisieren, wenn in den Vollbildmodus gewechselt wird
   
    fullscreenButton.classList.add("fullscreen");
  } else {
    fullscreenButton.classList.remove("fullscreen");
  }
}


/**
 * Responds to changes in screen orientation and shows/hides the orientation overlay.
 */
window.addEventListener("orientationchange", handleOrientationChange);

function handleOrientationChange() {
  let orientationOverlay = document.getElementById("orientationOverlay");
  if (window.orientation === 0) {
    orientationOverlay.style.display = "flex";
  } else {
    orientationOverlay.style.display = "none";
  }
}
window.addEventListener("DOMContentLoaded", function () {
  handleOrientationChange();
});


/**
 * Handles keyboard events and updates the status of the keys.
 *
 * @param {KeyboardEvent} e - The keyboard event object.
 * @param {boolean} isPressed - Indicates whether the key is pressed or not.
 */
function handleKeyboardEvent(e, isPressed) {
  switch (e.keyCode) {
    case 39:
      keyboard.RIGHT = isPressed;
      break;
    case 37:
      keyboard.LEFT = isPressed;
      break;
    case 38:
      keyboard.UP = isPressed;
      break;
    case 40:
      keyboard.DOWN = isPressed;
      break;
    case 32: 
      keyboard.SPACE = isPressed;
      break;
    case 68:
      keyboard.D = isPressed;
      break;
  }
}


/**
 * Handles the keyboard event when a key is pressed.
 */
window.addEventListener("keydown", (e) => {
  handleKeyboardEvent(e, true);
});


/**
 * Handles the keyboard event when a key is released.
 */
window.addEventListener("keyup", (e) => {
  handleKeyboardEvent(e, false);
});


/**
 * Handles touch events on mobile devices.
 */
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

  document.getElementById("run_left").addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      handleTouchEvent("run_left", true);
    },
    { passive: true }
  );

  document.getElementById("run_right").addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      handleTouchEvent("run_right", true);
    },
    { passive: true }
  );

  document.getElementById("jump").addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      handleTouchEvent("jump", true);
    },
    { passive: true }
  );

  document.getElementById("throw").addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      handleTouchEvent("throw", true);
    },
    { passive: true }
  );

  /**
   * Touchevent for Mobilephones
   */
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
