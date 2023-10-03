class Chicken extends MoveableObject {
    y = 370;
    width = 60;
    height = 60;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    currentImage = 0;

  
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING); //greift auf die Bilder im Array zu (IMAGES_WALKING)

        this.x = 200 + Math.random() * 500; // Startpunkt px + zufällig generierte Zahl + 500 (Px zwischen 0 und 500)
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }


    animate() {
        this.moveLeft();

        setInterval( () => {
            // this.IMAGES_WALKING.length ist die Länge des Arrays // % = Modulu = Mathematischer Rest! let i = this.currentImage % = (erster Durchlauf) let i = 0 % 6; =>  0, Rest 0 (oder i = 1 % 6 = 1:6 = 0, Rest 1)
            // bei i = 7 % 6 ist der Rest gleich 1, deshalb zählt die Funktion so: i = 0, 1, 2, 3, 4, 5, 0 und wieder von Anfang los 
            let i = this.currentImage % this.IMAGES_WALKING.length; 
            let path = this.IMAGES_WALKING[i]; // currentImage ist beim ersten Durchlauf 0, 
            this.img = this.imageCache[path];
            this.currentImage++; // CurrentImage wird um 1 erhöht
        }, 150);
    }
    

}