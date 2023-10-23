class MoveableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 3;
  energy = 100;
  lastHit = 0;

  
  
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


  // Charakter kollidiert mit Chicken?
  isColliding(obj) {
    return (
      this.x + this.width >= obj.x &&
      this.x <= obj.x &&
      this.y <= obj.y &&
      this.y + this.height >= obj.y
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



  // Ist der Character tot?
  isDead() {
    return this.energy == 0;
  }


  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Differenz im ms
    timepassed = timepassed / 1000; // Differenz in sek
    return timepassed < 1;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  
}
