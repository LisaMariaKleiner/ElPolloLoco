class World {
  character = new Character();
  endBoss;
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

  bossBar = new BossBar();

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
      this.checkHitBossWithBottle();
    }, 100);
  }



  checkThrowObjects() {
    if (this.keyboard.D && this.collectedBottlesCounter > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      bottle.hitBoss = false;
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


  checkHitBossWithBottle() {
    this.throwableObjects.forEach((bottle) => {
      if (this.bottleCollidingWithChicken(bottle, this.level.endBoss[0])) {
        console.log("Bottle Colliding with endboss");
        if (!bottle.hitBoss) {
          this.level.endBoss[0].hitBoss();
          bottle.hitBoss = true; // Markiere die Flasche als getroffen
          console.log(`Energy=`, this.level.endBoss[0].bossEnergy);
          this.bossBar.setBossPercentage(this.level.endBoss[0].bossEnergy);
        }
      }
    });
  }


  checkCollisionsBottleAndChicken() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy, index) => {
        if (this.bottleCollidingWithChicken(bottle, enemy)) {
          enemy.chickenIsDead();
          this.level.enemies.splice(index, 1);
        }
      });
    });
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

  bottleCollidingWithChicken(bottle, enemies) {
    return (
      bottle.x + bottle.width >= enemies.x &&
      bottle.x <= enemies.x + enemies.width &&
      bottle.y + bottle.height >= enemies.y &&
      bottle.y <= enemies.y + enemies.height
    );
  }

  drawBossImage() {
    let bossImage = new DrawableObject();
    bossImage.loadImage(["img/7_statusbars/3_icons/icon_health_endboss.png"]);
    bossImage.x = 1890;
    bossImage.y = -5;
    bossImage.width = 60; 
    bossImage.height = 60; 
    this.addToMap(bossImage);
  }


  drawStatusBar() {
    this.addToMap(this.bottleBar);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    
  }
  
  

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Canvas clearen!, sonst erscheint der Charakter mehrmals im Bildschirm
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgrounds);


    this.ctx.translate(-this.camera_x, 0);
    // -------- Space for fixed objects --------
    this.drawStatusBar();
  
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.endBoss);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.bossBar);
    this.drawBossImage();
   
    
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
   //mo.drawFrame(this.ctx);

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
