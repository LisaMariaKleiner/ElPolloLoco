class ThrowableObject extends MoveableObject {
  SALSA_IMAGES = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y) {
    super().loadImage(this.SALSA_IMAGES[0]);
    this.loadImages(this.SALSA_IMAGES);
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 50;
    this.throw();
  }

  throw() {
      this.speedY = 30;
      this.applyGravity();
      setInterval(() => {
        this.x += 10;
       }, 25);

      setInterval(() => {
        this.playAnimation(this.SALSA_IMAGES);
      }, 100);
  }
}
