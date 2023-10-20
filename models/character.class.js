class Character extends MoveableObject {
  height = 250;
  width = 120;
  y = 180;
  speed = 4;

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  world;
  walking_sound = new Audio("sounds/run.mp3");

  // Constructor wird zuerst ausgeführt!
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png"); // muss nur 1x geschrieben werden

    this.loadImages(this.IMAGES_WALKING); //greift auf die Bilder im Array zu (IMAGES_WALKING)

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false; // Bild nicht gespiegelt
        this.walking_sound.play();
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.x -= this.speed;
        this.otherDirection = true; // Bild gespiegelt
        this.walking_sound.play();
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      // Eine Intervallfunktion für den Bewegungsablauf

      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 50);
  }

}
