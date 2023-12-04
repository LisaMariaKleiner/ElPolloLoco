/**
 * Class representing a movable object in the game.
 * @extends DrawableObject
 */
class MoveableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 3;
  energy = 100;
  lastHit = 0;
  lastBossHit = 0;
  coins = [];
  bottles = [];

 

  /**
   * Defines the offset properties for collision detection.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };

  offset1 = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  };

  /**
   * Plays animation based on the provided images array.
   * @param {Array} images - The array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Applies gravity to the movable object, simulating vertical movement.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isInAir() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is in the air.
   * @returns {boolean} True if the object is in the air, otherwise false.
   */
  isInAir() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  /**
   * Checks if the object is colliding with another movable object.
   * @param {MoveableObject} mo - The other movable object.
   * @returns {boolean} True if colliding, otherwise false.
   */
 
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  isCollidingEnemy(mo) {
    let isHorizontalCollision =
      this.x + this.width - this.offset1.right > mo.x + mo.offset1.left &&
      this.x + this.offset1.left < mo.x + mo.width - mo.offset1.right;
  
    let isVerticalCollision =
      this.y + this.height - this.offset1.bottom > mo.y + mo.offset1.top &&
      this.y + this.offset1.top < mo.y + mo.height - mo.offset1.bottom;
  
    // Kollision nur dann als true zurückgeben, wenn es eine vertikale Kollision gibt
    return isHorizontalCollision && isVerticalCollision;
  }
  

  

  /**
   * Hits the boss object, reducing its energy.
   */
  hitBoss() {
    if (this.bossEnergy > 0) {
      this.bossEnergy -= 25;
      this.lastBossHit = new Date().getTime();
    } else if (this.bossEnergy < 0) {
      this.bossEnergy = 0;
    }
  }

  /**
   * Hits the movable object, reducing its energy.
   */
  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime(); // Zeit vergangen in ms seit 01.01.1970
    }
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }
}
