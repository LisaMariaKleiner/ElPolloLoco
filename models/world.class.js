class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = -100;
  statusBar = new StatusBar();
  throwableObjects = [];

  collectedCoins = []; // Behalten Sie diese Variable für die Liste der gesammelten Münzen
  collectedCoinsCounter = 0; // Fügen Sie diese Variable hinzu, um die Anzahl der gesammelten Münzen zu zählen

  collectedBottles = [];
  collectedBottlesCounter = 0; 

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    
    this.coinBar = new CoinBar(this.collectedCoins);
    this.bottleBar = new BottleBar(this.collectedBottles);
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkCollisionsWithCoins();
    }, 100);
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemies) => {
      if (this.character.isColliding(enemies)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  checkCollisionsWithCoins() {
    let character = this.character;
    let coinsToRemove = [];
  
    this.level.coins.forEach((coin) => {
      if (character.isCollidingWithCoin(coin)) {
        coinsToRemove.push(coin);
      }
    });
  
    coinsToRemove.forEach((coin) => {
      let index = this.level.coins.indexOf(coin);
      if (index !== -1) {
        this.level.coins.splice(index, 1);
        this.collectedCoinsCounter++; // Inkrementieren Sie den Zähler für gesammelte Münzen.
      }
    });
  
    this.coinBar.setCoinCounter(this.collectedCoinsCounter); // Aktualisieren Sie die CoinBar mit dem Zähler.
  }
  

  

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Canvas clearen!, sonst erscheint der Charakter mehrmals im Bildschirm

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgrounds);

    this.ctx.translate(-this.camera_x, 0);
    // -------- Space for fixed objects --------
    this.addToMap(this.bottleBar);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    // Mit " this.draw" würde es eine unendlichschleife geben und wsl der PC abstürzen
    let self = this; // Neue Variable für this erstellen, weil er darauf jetzt nicht mehr zugreifen kann
    requestAnimationFrame(function () {
      // requestAnimationFrame ruft vor jedem erneuten Rendern (»Refresh«) des Browserfensters die Animations-Funktion auf und erzeugt so einen weichen Übergang von einem Frame zum nächsten. Mit requestAnimationFrame anstelle von setInterval oder setTimeout übernimmt der Browser die Schnittstelle und optimiert das Verfahren, so dass Animationen runder, ohne Ruckeln und effizienter ablaufen.
      self.draw(); // self führt jetzt die Funktion draw() aus.
    });
  }
  

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o); // Die jeweiligen Objekte die oben definiert sind der Map hinzufügen
    });
  }

  // Fügt MovableObjects ins Canvas ein
  addToMap(mo) {
    if (mo.otherDirection) {
      // MoveableObject.andereRichtung
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
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
    mo.x = mo.x * -1; // X achse wieder in Ursprungszustand setzen
    this.ctx.restore();
  }
}
