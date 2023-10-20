class MoveableObject {
    x = 120;
    y = 180;
    height = 250;
    width = 120;
    img;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;

    


//z.B loadImage('img/testbild.png') -> Das bild ist jetzt der Pfad.
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') oder wie -> <img id="image" src="">
        this.img.src = path;
    }

/**
 * 
 * @param {Array} array - ['img/image1.png', 'img/image2.png, ...']
 */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveRight() {
        setInterval(() => { // Intervall Funktion
            this.x += this.speed // Verringe die Pixelzahl der x Achse immer um 0.3 px
        }, 1000 / 60); // mit 60 FPS (60x pro sek)
    }


    moveLeft() {
        setInterval(() => { // Intervall Funktion
            this.x -= this.speed // Verringe die Pixelzahl der x Achse immer um 0.3 px
        }, 1000 / 60); // mit 60 FPS (60x pro sek)
    }
}