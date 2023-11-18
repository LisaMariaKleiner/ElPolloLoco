/**
 * Represents a bottle object in the game that extends the MoveableObject class.
 */
class Bottles extends MoveableObject {

    width = 60;
    height = 70;
    speed = 0;
    isCollected = false;

    IMAGES_Bottles = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    ];


    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_Bottles);
        this.y = 350;
        this.x = 300  + Math.random() * 1500;
        this.isCollected = false;
    }





}