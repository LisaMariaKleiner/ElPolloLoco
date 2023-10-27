class Chicken extends MoveableObject {
  y = 370;
  width = 60;
  height = 60;
  //chicken_sound = new Audio("sounds/chickensound.mp3");

  chickenMovedLeft = setInterval(() => {
                    this.moveLeft();
                    this.otherDirection = false; 
                    }, 1000 / 60);

  walkingChickenInterval = setInterval(() => {
                           this.playAnimation(this.IMAGES_WALKING);
                           }, 150);

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_CHICKEN_DEAD = [
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
  ];

  constructor(isBackChicken = false) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING); //greift auf die Bilder im Array zu (IMAGES_WALKING)
    this.loadImages(this.IMAGES_CHICKEN_DEAD);

    if (isBackChicken) {
      this.x = 1200 + Math.random() * 1000; // Startpunkt px + zufällig generierte Zahl + 500 (Px zwischen 0 und 500)
    } else {
      this.x = 800 + Math.random() * 700;
    }

    this.speed = 0.15 + Math.random() * 0.25;

    this.animate();
  }

  animate() {
    

  }

  chickenIsDead() {
    clearInterval(this.walkingChickenInterval);
    this.playAnimation(this.IMAGES_CHICKEN_DEAD);
  }
}
