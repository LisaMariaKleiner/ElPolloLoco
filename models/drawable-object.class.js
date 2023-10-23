class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 180;
    height = 250;
    width = 120;
  


    //z.B loadImage('img/testbild.png') -> Das bild ist jetzt der Pfad.
  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementById('image') oder wie -> <img id="image" src="">
    this.img.src = path;
  }


  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }


  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }


  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      // Frame nur bei Charakter und Chicken anwenden
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "pink";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }


}