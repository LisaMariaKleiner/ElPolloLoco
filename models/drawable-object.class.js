/**
 * Represents a drawable object in the game.
 */
class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 180;
  height = 250;
  width = 120;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }


  /**
   * Draws the drawable object on the provided canvas context (ctx).
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    if (this.isImageLoaded()) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }


  /**
   * Checks if the image is loaded.
   *
   * @returns {boolean} - True if the image is loaded, false otherwise.
   */
  isImageLoaded() {
    return this.img && this.img.complete;
  }


  /**
   * Loads an array of images and stores them in the image cache.
   *
   * @param {string[]} array - An array of image paths to be loaded.
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
