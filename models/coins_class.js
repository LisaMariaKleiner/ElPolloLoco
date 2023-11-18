/**
 * Represents a moveable coin object in the game that extends the MoveableObject class.
 */
class Coins extends MoveableObject {
  width = 90;
  height = 90;
  speed = 0;
  isCollected = false; 

  IMAGES_COINS = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];


  /**
   * Creates an instance of the Coins class.
   */
  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COINS);
    this.x = 200 + Math.random() * 2000;
    this.y = 50 + Math.random() * 300;
    this.isCollected = false;
    this.animate();
  }


  /**
   * Initiates the animation of the coin, playing the sequence of images.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 150);
  }
}
