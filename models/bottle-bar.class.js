/**
 * Represents a bottle collection bar in the game, extending the DrawableObject class.
 */
class BottleBar extends DrawableObject {
  /**
   * Array of images representing the bottle bar at different levels of bottle collection.
   *
   * @type {string[]}
   */
  IMAGES_Bottlebar = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  /**
   * The number of collected bottles.
   *
   * @type {number}
   */
  bottleCounter = 0; //Initialisiere den BottleCounter auf 0

  /**
   * Creates an instance of the BottleBar class.
   *
   * @param {number} collectedBottles - The initial number of collected bottles.
   */
  constructor(collectedBottles) {
    super();
    this.collectedBottles = collectedBottles;
    this.loadImages(this.IMAGES_Bottlebar);
    this.x = 20;
    this.y = 70;
    this.width = 200;
    this.height = 50;
    this.setBottleCounter();
  }

  /**
   * Sets the bottle counter and updates the displayed image accordingly.
   *
   * @param {number} counter - The new bottle counter.
   */
  setBottleCounter(counter) {
    this.bottleCounter = counter;
    let path = this.IMAGES_Bottlebar[this.resolveImageIndexBottle(counter)];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image based on the current bottle counter.
   *
   * @param {number} bottleCounter - The current bottle counter.
   * @returns {number} - The index of the image in the IMAGES_Bottlebar array.
   */
  resolveImageIndexBottle(bottleCounter) {
    if (bottleCounter >= 5) {
      return 5;
    } else if (bottleCounter === 4) {
      return 4;
    } else if (bottleCounter === 3) {
      return 3;
    } else if (bottleCounter === 2) {
      return 2;
    } else if (bottleCounter === 1) {
      return 1;
    } else {
      return 0;
    }
  }
}
