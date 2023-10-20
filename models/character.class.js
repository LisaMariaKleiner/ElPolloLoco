class Character extends MoveableObject {
  height = 250;
  width = 120;
  y = 180; // 180 vorher
  speed = 4;
  world;
  walking_sound = new Audio("sounds/run.mp3");

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
  "img/2_character_pepe/3_jump/J-31.png",
  "img/2_character_pepe/3_jump/J-32.png",
  "img/2_character_pepe/3_jump/J-33.png",
  "img/2_character_pepe/3_jump/J-34.png",
  "img/2_character_pepe/3_jump/J-35.png",
  "img/2_character_pepe/3_jump/J-36.png",
  "img/2_character_pepe/3_jump/J-37.png",
  "img/2_character_pepe/3_jump/J-38.png",
  "img/2_character_pepe/3_jump/J-39.png",
  ];


  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png"
  ]

  

  // Constructor wird zuerst ausgeführt!
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png"); // muss nur 1x geschrieben werden

    this.loadImages(this.IMAGES_WALKING); //greift auf die Bilder im Array zu (IMAGES_WALKING)
    this.loadImages(this.IMAGES_JUMPING); // Bilder vom Springen im Array zu (IMAGES_JUMPING)
    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.walking_sound.pause();

      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false; // Bild nicht gespiegelt
        this.walking_sound.play();
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true; // Bild gespiegelt
        this.walking_sound.play();
      }

      if(this.world.keyboard.SPACE && !this.isInAir()) {
       this.jump();
      }


      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {// Eine Intervallfunktion für den Bewegungsablauf

      if(this.isInAir()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 50);
  }

}
