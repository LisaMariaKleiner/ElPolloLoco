/**
 * Class representing a status bar in the game.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
  IMAGES_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.x = 20;
    this.y = -5;
    this.width = 200;
    this.height = 50
    this.setPercentage(100);
  }


  /**
   * Sets the percentage value of the status bar.
   * @param {number} percentage - The new percentage value.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }


  /**
   * Resolves the index of the image based on the current percentage.
   * @returns {number} The index of the image in the IMAGES_HEALTH array.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
        return 1;
    } else {
      return 0;
    }
  }
}
