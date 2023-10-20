class Background extends MoveableObject {

    width = 720;
    height = 480;
  
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height; // 480px (Canvas) - 400px vom Bild = y Achse = 80px
    }

    

}