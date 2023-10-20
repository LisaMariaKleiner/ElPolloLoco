class MoveableObject {
  x = 120;
  y = 180;
  height = 250;
  width = 120;
  img;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 3;
  energy = 100;

  

  //z.B loadImage('img/testbild.png') -> Das bild ist jetzt der Pfad.
  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementById('image') oder wie -> <img id="image" src="">
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      // Frame nur bei Charakter und Chicken anwenden
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "pink";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }


  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }


  playAnimation(images) {
    let i = this.currentImage % this.IMAGES_WALKING.length;
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
    return this.y < 180;
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


  hit() {
    this.energy -= 5;
    if(this.energy < 0) {
        this.energy = 0;
    }
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }
}
