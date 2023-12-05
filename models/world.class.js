/**
 * Represents the game world with characters, enemies, and various elements.
 */
class World {
  character = new Character();
  bossBar = new BossBar();
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
  collectedCoins = [];
  collectedCoinsCounter = 0;
  collectedBottles = [];
  collectedBottlesCounter = 0;
  invincible = false;

  /**
   * Creates a new World instance.
   * @param {HTMLCanvasElement} canvas - The HTML canvas element.
   * @param {Object} keyboard - The keyboard input for the game.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }
  

  /**
   * Sets the current world for the main character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Runs the game loop.
   */
  run() {
     let interval = setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkCollisionsWithCoins();
      this.checkCollisionsWithBottles();
      this.checkCollisionsBottleAndChicken();
      this.checkHitBossWithBottle();
    }, 50);
  }

  
  /**
   * Checks for throwable objects and throws them if the conditions are met.
   */
  lastThrowTime = 0;

  checkThrowObjects() {
    const currentTime = Date.now();
    const throwInterval = 1000;

    if (
      this.keyboard.D &&
      this.collectedBottlesCounter > 0 &&
      currentTime - this.lastThrowTime >= throwInterval
    ) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      bottle.hitBoss = false;
      this.throwableObjects.push(bottle);
      this.collectedBottlesCounter--;
      this.lastThrowTime = currentTime;
    }

    this.bottleBar.setBottleCounter(this.collectedBottlesCounter);
  }

  /**
   * Checks for collisions between characters and enemies.
   */
  checkCollisions() {
    this.level.enemies.concat(this.level.endBoss).forEach((enemy, index) => {
      if (this.character.isCollidingEnemy(enemy)) {
        if (
          this.character.isInAir() &&
          this.character.speedY < 0 &&
          enemy.energy != 0 &&
          this.invincible == false
        ) {
          this.character.littleJump();
          enemy.animate();
          enemy.energy = 0;
          setTimeout(() => {
            if (this.level.enemies[index] === enemy) {
              this.deleteEnemy(index);
            }
          }, 500);
        } else if (enemy.energy != 0 && this.invincible == false) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });
  }

  /**
   * Deletes an enemy from the level.
   * @param {number} index - The index of the enemy to delete.
   */
  deleteEnemy(index) {
    this.level.enemies.splice(index, 1);
  }

  /**
   * Checks if throwable objects hit the end boss and updates the boss's health.
   */
  checkHitBossWithBottle() {
    this.throwableObjects.forEach((bottle) => {
      if (this.bottleCollidingWithChicken(bottle, this.level.endBoss[0])) {
        if (!bottle.hitBoss) {
          this.level.endBoss[0].hitBoss();
          bottle.hitBoss = true;
          this.bossBar.setBossPercentage(this.level.endBoss[0].bossEnergy);
          if (bottle instanceof ThrowableObject) {
            bottle.bottleSplash(
              this.level.endBoss[0].x,
              this.level.endBoss[0].y
            );
          }
          setTimeout(() => {
            let bottleIndex = this.throwableObjects.indexOf(bottle);
            if (bottleIndex !== -1) {
              this.throwableObjects.splice(bottleIndex, 1);
            }
          }, 1000);
        }
      }
    });
  }

  /**
   * Checks for collisions between throwable objects and enemies, removing the enemy if hit.
   */
  checkCollisionsBottleAndChicken() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy, index) => {
        if (this.bottleCollidingWithChicken(bottle, enemy)) {
          this.level.enemies.splice(index, 1);
        }
      });
    });
  }

  /**
   * Checks for collisions between the main character and coins, updating the coin counter.
   */
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
        this.collectedCoinsCounter++;
      }
    });
    this.coinBar.setCoinCounter(this.collectedCoinsCounter);
  }

  /**
   * Checks for collisions between the main character and bottles, updating the bottle counter.
   */
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
        this.collectedBottlesCounter++;
      }
    });
    this.bottleBar.setBottleCounter(this.collectedBottlesCounter);
  }

  /**
   * Checks if a throwable object collides with an enemy (chicken).
   * @param {ThrowableObject} bottle - The throwable object (bottle).
   * @param {Chicken} enemies - The enemy (chicken).
   * @returns {boolean} True if collision occurs, otherwise false.
   */
  bottleCollidingWithChicken(bottle, enemies) {
    return (
      bottle.x + bottle.width >= enemies.x &&
      bottle.x <= enemies.x + enemies.width &&
      bottle.y + bottle.height >= enemies.y &&
      bottle.y <= enemies.y + enemies.height
    );
  }

  

  /**
   * Draws the boss image on the canvas.
   */
  drawBossImage() {
    let bossImage = new DrawableObject();
    bossImage.loadImage(["img/7_statusbars/3_icons/icon_health_endboss.png"]);
    bossImage.x = 1890;
    bossImage.y = -5;
    bossImage.width = 60;
    bossImage.height = 60;
    this.addToMap(bossImage);
  }

  /**
   * Draws the status bar, coin bar, and bottle bar on the canvas.
   */
  drawStatusBar() {
    this.addToMap(this.bottleBar);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
  }

  /**
   * Draws objects on the canvas and initiates animation frames.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Canvas clearen!, sonst erscheint der Charakter mehrmals im Bildschirm
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgrounds);
    this.ctx.translate(-this.camera_x, 0);
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
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds movable objects to the canvas.
   * @param {Array<MoveableObject>} objects - The array of movable objects to add.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Draws movable objects on the canvas.
   * @param {MoveableObject} mo - The movable object to draw.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the image for a movable object.
   * @param {MoveableObject} mo - The movable object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Flips the image back for a movable object.
   * @param {MoveableObject} mo - The movable object to flip back.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
