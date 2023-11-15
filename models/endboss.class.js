class Endboss extends MoveableObject {
  y = 230;
  width = 150;
  height = 200;
  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  

  hadFirstContact = false;

  IMAGES_BOSS_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_BOSS_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATACKING = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_BOSS_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_BOSS_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  
  constructor() {
    super();
    this.loadImages(this.IMAGES_BOSS_ALERT);
    this.loadImages(this.IMAGES_BOSS_DEAD);
    this.loadImages(this.IMAGES_BOSS_HURT);
    this.loadImages(this.IMAGES_ATACKING);
    this.loadImages(this.IMAGES_BOSS_WALKING);
    this.bossEnergy = 100;
    this.speed = 7;
    this.x = 2000;
    this.animate();
  }

  animate() {
    let i = 0; 

    let walkingInterval;
    let attackInterval;

    walkingInterval = setInterval(() => {
      if (i < 10) {
        this.playAnimation(this.IMAGES_BOSS_WALKING);
      } else {
        this.playAnimation(this.IMAGES_BOSS_ALERT);
        this.playAnimation(this.IMAGES_ATACKING);
      }
      i++;
      if (world.character.x > 2500 && !hadFirstContact) {
        i = 0;
        hadFirstContact = true;
      }
    }, 150);

    attackInterval = setInterval(() => {
      if (this.endbossIsHurt()) {
        this.playAnimation(this.IMAGES_BOSS_HURT);
        endBossMusic.play();
        this.moveLeft();
      } else if (this.bossIsDead()) {
        this.playAnimation(this.IMAGES_BOSS_DEAD);
        endBossMusic.pause();
        // Beende die Intervalle, wenn der Boss tot ist
        clearInterval(walkingInterval);
        clearInterval(attackInterval);
        this.showWinScreen();// Rufe die Funktion für den GameOver-Screen auf
      }
    }, 150);
  }

  bossIsDead() {
    return this.bossEnergy == 0;
  }

  endbossIsHurt() {
    let bosstimepassed = new Date().getTime() - this.lastBossHit; // Differenz im ms
    bosstimepassed = bosstimepassed / 1000; // Differenz in sek
    return bosstimepassed < 1;
  }

  showWinScreen() {
    document.getElementById('win').classList.remove('d-none');
    document.getElementById('game').classList.add('d-none');
    endbossKilled.play();
  }
  
  
}
