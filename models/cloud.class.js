/**
 * Represents a cloud object in the game that extends the MoveableObject class.
 */
class Cloud extends MoveableObject {
  y = 20;
  width = 500;
  height = 300;

  /**
   * Creates an instance of the Cloud class.
   */
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 500; // Zahl zwischen 200 und 70
    this.animate();
  }

  animate() {
    this.moveLeft();
  }
}
