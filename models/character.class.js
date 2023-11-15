class Character extends MoveableObject {
  height = 250;
  width = 120;
  y = 150; // 180 vorher
  speed = 4;
  world;
  coins;
  
  

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
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];


  // Constructor wird zuerst ausgeführt!
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_IDLE);
    this.applyGravity();
    this.animate();
  }

  animate() {
    const character = this;

    const movementIntervalId = setInterval(() => {
      walking_sound.pause();

      if (character.world.keyboard.RIGHT && character.x < character.world.level.level_end_x) {
        character.moveRight();
        character.otherDirection = false;
        walking_sound.play();
      }
      if (character.world.keyboard.LEFT && character.x > 0) {
        character.moveLeft();
        character.otherDirection = true;
        walking_sound.play();
      }
      if (character.world.keyboard.SPACE && !character.isInAir()) {
        character.jump();
        jumpSound.play();
      }
      character.world.camera_x = -character.x + 100;
    }, 1000 / 60);

    const actionIntervalId = setInterval(() => {
      if (character.isDead()) {
        deadSound.play();
        character.playAnimation(character.IMAGES_DEAD);
        character.showGameOverScreen();
      } else if (character.isHurt()) {
        painSound.play();
        character.playAnimation(character.IMAGES_HURT);
      } else if (character.world.keyboard.RIGHT || character.world.keyboard.LEFT) {
        walking_sound.play();
        character.playAnimation(character.IMAGES_WALKING);
      }
    }, 50);

    const idleIntervalId = setInterval(() => {
      if (character.isIdle()) {
        character.playAnimation(character.IMAGES_IDLE);
      }
    }, 4000);

    character.intervalIds = [movementIntervalId, actionIntervalId, idleIntervalId];
  }

  stopIntervals() {
    if (this.intervalIds) {
      this.intervalIds.forEach((id) => clearInterval(id));
    }
  }

  jump() {
    this.speedY = 30;
  }

  moveRight() {
    this.x += this.speed;
  }

  isIdle() {
    return (
      this.world.keyboard.RIGHT == false &&
      this.world.keyboard.LEFT == false &&
      this.world.keyboard.SPACE == false &&
      this.world.keyboard.D == false
    );
  }

  isDead() {
    return this.energy == 0;
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Differenz im ms
    timepassed = timepassed / 1000; // Differenz in sek
    return timepassed < 1;
  }

  showGameOverScreen() {
    this.stopIntervals(); 
    document.getElementById('gameOver').classList.remove('d-none');
    document.getElementById('game').classList.add('d-none');
  }
}
