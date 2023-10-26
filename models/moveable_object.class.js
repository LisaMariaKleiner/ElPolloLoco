class MoveableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 3;
  energy = 100;
  lastHit = 0;
  coins = [];

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  // Charakter fällt runter
  applyGravity() {
    setInterval(() => {
      if (this.isInAir() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  // Charakter befindet sich in der Luft
  isInAir() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  // Charakter kollidiert mit Chicken?
  isColliding(enemy) {
    return (
      this.x + this.width >= enemy.x &&
      this.x <= enemy.x &&
      this.y <= enemy.y &&
      this.y + this.height >= enemy.y
    );
  }

  // Charakter berührt Coin und gibt Daten zurück
  isCollidingWithCoin(coin) {
    return (
      this.x + this.width >= coin.x &&
      this.x <= coin.x &&
      this.y <= coin.y &&
      this.y + this.height >= coin.y
    );
  }

  // Character getroffen? Dann zieh Energy ab
  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime(); // Zeit vergangen in ms seit 01.01.1970
    }
  }

  
  hitCoins(coin) {
    if (!this.coins.includes(coin)) {
      this.coins.push(coin);
    }
  }

  moveLeft() {
    this.x -= this.speed;
  }


  
}
