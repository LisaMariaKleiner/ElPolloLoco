class Character extends MoveableObject {

    height = 250;
    width = 120;
    y = 180;
    speed = 4;
  
IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',
];
world;
walking_sound = new Audio('sounds/run.mp3');

// Constructor wird zuerst ausgeführt!
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png'); // muss nur 1x geschrieben werden

        this.loadImages(this.IMAGES_WALKING); //greift auf die Bilder im Array zu (IMAGES_WALKING)

        this.animate();
    }


    animate() {

        setInterval(() => {
            this.walking_sound.pause();
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false; // Bild nicht gespiegelt
                this.walking_sound.play();
            }
            if(this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true; // Bild gespiegelt
                this.walking_sound.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);


        setInterval(() => { // Eine Intervallfunktion für den Bewegungsablauf
            
            if(this.world.keyboard.RIGHT  || this.world.keyboard.LEFT){
        
                this.playAnimation(this.IMAGES_WALKING)
            }

        }, 50);
    }


    playAnimation(images) {
        // Walk animation
                // this.IMAGES_WALKING.length ist die Länge des Arrays // % = Modulu = Mathematischer Rest! let i = this.currentImage % = (erster Durchlauf) let i = 0 % 6; =>  0, Rest 0 (oder i = 1 % 6 = 1:6 = 0, Rest 1)
                // bei i = 7 % 6 ist der Rest gleich 1, deshalb zählt die Funktion so: i = 0, 1, 2, 3, 4, 5, 0 und wieder von Anfang los 
        let i = this.currentImage % images.length;
        let path = images[i]; // currentImage ist beim ersten Durchlauf 0, 
        this.img = this.imageCache[path];
        this.currentImage++; // CurrentImage wird um 1 erhöht
    };



    jump() {

    }
}