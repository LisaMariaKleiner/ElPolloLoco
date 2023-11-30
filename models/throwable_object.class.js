/**
 * Class representing a throwable object in the game.
 * @extends MoveableObject
 */
class ThrowableObject extends MoveableObject {
  SALSA_IMAGES = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_BOTTLE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  throwBottle = setInterval(() => {
    this.playAnimation(this.SALSA_IMAGES);
  }, 100);

  /**
   * Creates a new ThrowableObject instance.
   * @param {number} x - The initial x-coordinate of the throwable object.
   * @param {number} y - The initial y-coordinate of the throwable object.
   */
  constructor(x, y) {
    super().loadImage(this.SALSA_IMAGES[0]);
    this.loadImages(this.SALSA_IMAGES);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 50;
    this.throw();
  }

  /**
   * Initiates the throwing action, applying speed and gravity.
   */
  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }

  bottleSplash(x, y) {
    clearInterval(this.throwBottle);
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.playAnimation(this.IMAGES_BOTTLE_SPLASH, 200);
  }
}
