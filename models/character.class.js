/**
 * Represents a character in the game that extends the MoveableObject class.
 */
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


  /**
   * Initiates animation intervals for character movement, actions, and idle state.
   */
  animate() {
    let character = this;
    let movementIntervalId = setInterval(() => {
      character.handleMovement();
      character.world.camera_x = -character.x + 100;
    }, 1000 / 60);
    let actionIntervalId = setInterval(() => {
      character.handleActions();
    }, 50);
    let idleIntervalId = setInterval(() => {
      character.handleIdle();
    }, 500);
    character.intervalIds = [
      movementIntervalId,
      actionIntervalId,
      idleIntervalId,
    ];
  }


  /**
   * Handles character movement based on keyboard input.
   */
  handleMovement() {
    walking_sound.pause();
    if (this.canMoveRight()) {
      this.moveRight();
      this.otherDirection = false;
    }
    if (this.canMoveLeft()) {
      this.moveLeft();
      this.otherDirection = true;
      walking_sound.play();
    }
    if (this.canJump()) {
      this.jump();
      jumpSound.play();
    }
  }


  /**
   * Checks if the character can move to the right.
   *
   * @returns {boolean} - True if the character can move to the right, false otherwise.
   */
  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }


  /**
   * Checks if the character can move to the left.
   *
   * @returns {boolean} - True if the character can move to the left, false otherwise.
   */
  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  /**
   * Checks if the character can jump.
   *
   * @returns {boolean} - True if the character can jump, false otherwise.
   */
  canJump() {
    return this.world.keyboard.SPACE && !this.isInAir();
  }

  /**
   * Handles character actions such as playing animations for walking, jumping, hurting, and being dead.
   */
  handleActions() {
    if (this.isDead()) {
      deadSound.play();
      this.playAnimation(this.IMAGES_DEAD);
      this.showGameOverScreen();
    } else if (this.isHurt()) {
      painSound.play();
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      walking_sound.play();
      this.playAnimation(this.IMAGES_WALKING);
    }
  }


  /**
   * Handles character idle state by playing idle animations.
   */
  handleIdle() {
    if (this.isIdle()) {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

  /**
   * Stops all animation intervals
   **/
  stopIntervals() {
    if (this.intervalIds) {
      this.intervalIds.forEach((id) => clearInterval(id));
    }
  }

  /**
   * Initiates a high jump by setting the vertical speed to 30.
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Initiates a short jump by setting the vertical speed to 10.
   */
  littleJump() {
    this.speedY = 10;
  }

  /**
   * Moves the character to the right by updating its x-coordinate and playing walking sounds.
   */
  moveRight() {
    this.x += this.speed;
    walking_sound.play();
  }

  /**
   * Checks if the character is in an idle state.
   *
   * @returns {boolean} - True if the character is idle, false otherwise.
   */
  isIdle() {
    return (
      this.world.keyboard.RIGHT == false &&
      this.world.keyboard.LEFT == false &&
      this.world.keyboard.SPACE == false &&
      this.world.keyboard.D == false
    );
  }


  /**
   * Checks if the character is dead based on its energy level.
   *
   * @returns {boolean} - True if the character is dead, false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }


  /**
   * Checks if the character is hurt based on the time elapsed since the last hit.
   *
   * @returns {boolean} - True if the character is hurt, false otherwise.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Differenz im ms
    timepassed = timepassed / 1000; // Differenz in sek
    return timepassed < 1;
  }


   /**
   * Displays the game over screen, stops all animation intervals, and updates the UI.
   */
  showGameOverScreen() {
    this.stopIntervals();
    document.getElementById("gameOver").classList.remove("d-none");
    document.getElementById("game").classList.add("d-none");
  }
}
