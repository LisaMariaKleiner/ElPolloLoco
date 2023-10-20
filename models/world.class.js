class World {
    // In JS Klassen bei Variablen weder const noch let davor 
    character = new Character();

    level = level1;

    canvas;
    ctx; // Sammlung von Kontext in Javascript
    keyboard;
    camera_x = -100;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }


    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);// Canvas clearen!, sonst erscheint der Charakter mehrmals im Bildschirm

        this.ctx.translate(this.camera_x, 0);
        
        this.addObjectsToMap(this.level.backgrounds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        


// Mit " this.draw" würde es eine unendlichschleife geben und wsl der PC abstürzen
        let self = this; // Neue Variable für this erstellen, weil er darauf jetzt nicht mehr zugreifen kann
        requestAnimationFrame(function() { // requestAnimationFrame ruft vor jedem erneuten Rendern (»Refresh«) des Browserfensters die Animations-Funktion auf und erzeugt so einen weichen Übergang von einem Frame zum nächsten. Mit requestAnimationFrame anstelle von setInterval oder setTimeout übernimmt der Browser die Schnittstelle und optimiert das Verfahren, so dass Animationen runder, ohne Ruckeln und effizienter ablaufen.
            self.draw(); // self führt jetzt die Funktion draw() aus.
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o); // Die jeweiligen Objekte die oben definiert sind der Map hinzufügen
        })
    }
// Fügt MovableObjects ins Canvas ein 
    addToMap(mo) { //movable object

        if(mo.otherDirection) { // MoveableObject.andereRichtung
            this.flipImage(mo);
        }

        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height); // Img anzeigen und Koordinate und größe und breite festlegen die hinterlegt ist
        
        if(mo.otherDirection) {
           this.flipImageBack(mo);
        }
    }

// Spiegelt das Bild
    flipImage(mo) {
        this.ctx.save();
            this.ctx.translate(mo.width, 0); // Bild spiegelverkehrt anzeigen
            this.ctx.scale(-1, 1); // Bild spiegelverkehrt anzeigen
            mo.x = mo.x * -1; // Die X achse dreht sich
    }

// Spiegelt es wieder zurück
    flipImageBack(mo) {
        mo.x = mo.x * -1 // X achse wieder in Ursprungszustand setzen
        this.ctx.restore();
    }
}