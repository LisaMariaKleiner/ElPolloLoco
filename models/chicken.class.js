class Chicken extends MoveableObject {
    y = 370;
    width = 60;
    height = 60;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

  
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING); //greift auf die Bilder im Array zu (IMAGES_WALKING)

        this.x = 200 + Math.random() * 500; // Startpunkt px + zufällig generierte Zahl + 500 (Px zwischen 0 und 500)
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }


    animate() {
        this.moveLeft();

        setInterval( () => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 150);
    }
    

}