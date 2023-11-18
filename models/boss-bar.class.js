/**
 * Represents a boss health bar in the game, extending the DrawableObject class.
 */

class BossBar extends DrawableObject {
  
/**
   * Array of images representing the boss's energy levels at different percentages.
   *
   * @type {string[]}
   */
  IMAGES_BOSSENERGY = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png",
  ];


  /**
   * Image representing the boss icon.
   *
   * @type {string[]}
   */
  IMAGE_BOSS = ["img/7_statusbars/3_icons/icon_health_endboss.png"];


  /**
   * The boss's current health percentage.
   *
   * @type {number}
   * @default 100
   */
  bossPercentage = 100;


  /**
   * Creates an instance of the BossBar class.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_BOSSENERGY); 
    this.loadImages(this.IMAGE_BOSS);

    this.x = 1900;
    this.y = -5;
    this.width = 200;
    this.height = 50;
    this.setBossPercentage(100);
  }


  /**
   * Sets the boss's health percentage and updates the displayed image accordingly.
   *
   * @param {number} bossPercentage - The new boss health percentage.
   */
  setBossPercentage(bossPercentage) {
    this.bossPercentage = bossPercentage;
    let path = this.IMAGES_BOSSENERGY[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }


  /**
   * Resolves the index of the image based on the current boss health percentage.
   *
   * @returns {number} - The index of the image in the IMAGES_BOSSENERGY array.
   */
  resolveImageIndex() {
    if (this.bossPercentage == 100) {
      return 5;
    } else if (this.bossPercentage > 80) {
      return 4;
    } else if (this.bossPercentage > 60) {
      return 3;
    } else if (this.bossPercentage > 40) {
      return 2;
    } else if (this.bossPercentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
