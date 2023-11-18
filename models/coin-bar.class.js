/**
 * Represents a coin counter bar in the game that extends the DrawableObject class.
 */
class CoinBar extends DrawableObject {
  IMAGES_CoinCounter = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  /**
   * The current count of collected coins.
   *
   * @type {number}
   * @default 0
   */
  coinCounter = 0;

  /**
   * Creates an instance of the CoinBar class.
   *
   * @param {number} collectedCoins - The initial count of collected coins.
   */
  constructor(collectedCoins) {
    super();
    this.collectedCoins = collectedCoins;
    this.loadImages(this.IMAGES_CoinCounter);
    this.x = 20;
    this.y = 30;
    this.width = 200;
    this.height = 50;
    this.setCoinCounter();
  }

  /**
   * Sets the current coin counter and updates the displayed image.
   *
   * @param {number} counter - The new count of collected coins.
   */
  setCoinCounter(counter) {
    this.coinCounter = counter;
    const path = this.IMAGES_CoinCounter[this.resolveImageIndexCoins(counter)];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the image index based on the current coin counter.
   *
   * @param {number} coinCounter - The current count of collected coins.
   * @returns {number} - The index representing the appropriate image for the coin counter.
   */
  resolveImageIndexCoins(coinCounter) {
    if (coinCounter >= 5) {
      return 5;
    } else if (coinCounter === 4) {
      return 4;
    } else if (coinCounter === 3) {
      return 3;
    } else if (coinCounter === 2) {
      return 2;
    } else if (coinCounter === 1) {
      return 1;
    } else {
      return 0;
    }
  }
}
