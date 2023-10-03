let canvas;
let world;
let keyboard = new Keyboard();
 


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    
    console.log('My Character is!', world.character);

}

// Hiermit wissen wir welche Taste gedrückt wurde und stellt diese beim drücken auf "true"
window.addEventListener("keydown", (e) => {
    if(e.keyCode == 39) { // Rechte Pfeiltaste
        keyboard.RIGHT = true;
    }
    if(e.keyCode == 37) { // Linke Pfeiltaste
        keyboard.LEFT = true;
    }
    if(e.keyCode == 38) { // Oben Pfeiltaste
        keyboard.UP = true;
    }
    if(e.keyCode == 40) { // Unten Pfeiltaste
        keyboard.DOWN = true;
    }
    if(e.keyCode == 32) { // Spacetaste
        keyboard.SPACE = true;
    }

});


window.addEventListener("keyup", (e) => {
    if(e.keyCode == 39) { // Rechte Pfeiltaste
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 37) { // Linke Pfeiltaste
        keyboard.LEFT = false;
    }
    if(e.keyCode == 38) { // Oben Pfeiltaste
        keyboard.UP = false;
    }
    if(e.keyCode == 40) { // Unten Pfeiltaste
        keyboard.DOWN = false;
    }
    if(e.keyCode == 32) { // Spacetaste
        keyboard.SPACE = false;
    }


    console.log(e);
});