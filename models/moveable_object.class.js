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

  isMuted = false;

  toggleMute() {
    this.isMuted = !this.isMuted;
    audioElements.forEach((audio) => {
      audio.muted = this.isMuted;
    });
  }

  playAudioWithMute(audioElement) {
    if (!this.isMuted) {
      audioElement.play();
    }
  }

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
  isColliding(mo) {
    return (
      this.x + this.width >= mo.x &&
      this.x <= mo.x &&
      this.y <= mo.y &&
      this.y + this.height >= mo.y
    );
  }

  isCollidingTopOfChicken(character, chicken) {
    let notCollidingOnX =
      character.x + character.width < chicken.x ||
      character.x > chicken.x + chicken.width;
    let notCollidingOnY = character.y + character.height < chicken.y;
    let topCollidingOnY =
      character.y + character.height >= chicken.y &&
      character.y <= chicken.y + chicken.height;
    return !(notCollidingOnX || notCollidingOnY) && topCollidingOnY;
  }

  hitBoss() {
    if (this.bossEnergy > 0) {
      this.bossEnergy -= 25;
      this.lastBossHit = new Date().getTime();
    } else if (this.bossEnergy < 0) {
      this.bossEnergy = 0;
    }
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime(); // Zeit vergangen in ms seit 01.01.1970
    }
  }

  moveLeft() {
    this.x -= this.speed;
  }

  
}
