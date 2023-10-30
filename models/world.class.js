class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = -100;
  statusBar = new StatusBar();
  coinBar = new CoinBar(this.collectedCoins);
  bottleBar = new BottleBar(this.collectedBottles);
  throwableObjects = [];

  collectedCoins = []; // gesammelte Münzen
  collectedCoinsCounter = 0; // Zähler für gesammelte Münzen

  collectedBottles = [];
  collectedBottlesCounter = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
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
      this.checkCollisionsWithBottles();
      this.checkCollisionsBottleAndChicken();
      this.checkCollisionsTopOfChicken();
    }, 100);
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.collectedBottlesCounter > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      this.collectedBottlesCounter--; // Inkrementieren Sie den Zähler für gesammelte Münzen
    }
    this.bottleBar.setBottleCounter(this.collectedBottlesCounter); // Aktualisieren Sie die CoinBar mit dem Zähler.
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy)) {
        if (this.character.isInAir()) {
          this.character.jump(); 
          this.level.enemies.splice(index, 1); 
        } else {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });
  }

  checkCollisionsBottleAndChicken() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (this.bottleCollidingWithChicken(bottle, enemy)) {
          enemy.chickenIsDead();
        }
      });
    });
  }

  /*checkCollisionsTopOfChicken() {
    for (let i = this.level.enemies.length - 1; i >= 0; i--) {
      const enemy = this.level.enemies[i];
      if (this.isCollidingTopOfChicken(this.character, enemy)) {
        enemy.chickenIsDead();
        this.level.enemies.splice(i, 1); // Entfernen Sie das Chicken aus der Liste der Feinde
      }
    }
  }*/

  isCollidingTopOfChicken(character, chicken) {
    // Überprüfen, ob die rechte Seite des Character nicht links von der linken Seite des Chicken ist
    let notCollidingOnX =
      character.x + character.width < chicken.x ||
      character.x > chicken.x + chicken.width;
    // Überprüfen, ob die untere Seite des Character nicht über der oberen Seite des Chicken ist
    let notCollidingOnY = character.y + character.height < chicken.y;
    // Überprüfen, ob die obere Seite des Character unter der oberen Seite des Chicken ist und die untere Seite des Character über der unteren Seite des Chicken ist.
    let topCollidingOnY =
      character.y + character.height >= chicken.y &&
      character.y <= chicken.y + chicken.height;
    // Nur wenn auf der X-Achse keine Kollision stattfindet und auf der Y-Achse der untere Teil des Character den oberen Teil des Chicken berührt, erfolgt eine Kollision
    return !(notCollidingOnX || notCollidingOnY) && topCollidingOnY;
  }

  bottleCollidingWithChicken(bottle, enemies) {
    return (
      bottle.x + bottle.width >= enemies.x &&
      bottle.x <= enemies.x + enemies.width &&
      bottle.y + bottle.height >= enemies.y &&
      bottle.y <= enemies.y + enemies.height
    );
  }

  checkCollisionsWithCoins() {
    let character = this.character;
    let coinsToRemove = [];

    this.level.coins.forEach((coin) => {
      if (character.isColliding(coin)) {
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

  checkCollisionsWithBottles() {
    let character = this.character;
    let bottlesToRemove = [];

    this.level.bottles.forEach((bottle) => {
      if (character.isColliding(bottle)) {
        bottlesToRemove.push(bottle);
      }
    });

    bottlesToRemove.forEach((bottle) => {
      let index = this.level.bottles.indexOf(bottle);
      if (index !== -1) {
        this.level.bottles.splice(index, 1);
        this.collectedBottlesCounter++; // Inkrementieren Sie den Zähler für gesammelte Münzen.
      }
    });

    this.bottleBar.setBottleCounter(this.collectedBottlesCounter); // Aktualisieren Sie die CoinBar mit dem Zähler.
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
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);

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
